import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { Favorite, Comment, PlayArrow } from '@mui/icons-material';

export function Post() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="tiffany">
            T
          </Avatar>
        }
        title="Tiffany"
        subheader="November 1, 2023"
      />
      <MediaPost/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Check out this song!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <Favorite />
        </IconButton>
        <IconButton aria-label="comment">
          <Comment />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function MediaPost() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }} style={{ boxShadow: "0 -2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.2)" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <IconButton aria-label="play/pause">
            <PlayArrow sx={{ height: 38, width: 38 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src="https://upload.wikimedia.org/wikipedia/en/5/5f/Mac_Miller_Live_from_Space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}