import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, ListItem, ListItemAvatar, Avatar, ListItemText, Autocomplete } from '@mui/material';

const clientId = '70d068513e2146d2bc810f3640c3d952';
const clientSecret = 'e3541689ffb04c74b0e4c43c9d1adc2e';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const AlbumSearch = ({ onAlbumSelected, externalKey }) => {
  const [accessToken, setAccessToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchTerm('');
    setSearchResults([]);
  }, [externalKey]);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post(
          tokenEndpoint,
          'grant_type=client_credentials',
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
          }
        );

        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    const searchAlbumByName = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchTerm}&type=album`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
  
          setSearchResults(response.data.albums.items);
        } catch (error) {
          console.error('Error searching for album by name:', error);
        }
      }
    };

    const searchTimer = setTimeout(() => {
      searchAlbumByName();
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchTerm, accessToken]);

  return (
    <Box sx={{ paddingTop: '16px' }}>
      <Autocomplete
        options={searchResults}
        getOptionLabel={(album) => album.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter album name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
        renderOption={(props, album) => (
          <div {...props} key={album.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={album.name} src={album.images[0].url} />
              </ListItemAvatar>
              <ListItemText
                primary={album.name}
                secondary={`Artist: ${album.artists[0].name}`}
              />
            </ListItem>
          </div>
        )}
        onChange={(event, newValue) => {
          onAlbumSelected(newValue);
        }}
      />
    </Box>
  );
};

export default AlbumSearch;
