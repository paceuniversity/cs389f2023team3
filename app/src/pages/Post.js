import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@mui/material';
import { Favorite, Comment, PlayArrow } from '@mui/icons-material';

export function Post({ postData }) {
  const date = postData.date instanceof Date ? postData.date : postData.date.toDate();

  return (
    <Card sx={{ maxWidth: 240, display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar aria-label={postData.userName}>
            {postData.userName.charAt(0)}
          </Avatar>
        }
        title={postData.userName}
        subheader={date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      />
      <MediaPost postData={postData} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {postData.description}
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

function MediaPost({ postData }) {
  const handleButtonClick = () => {
    const urlToOpen = `https://open.spotify.com/album/${postData.albumId}`;
    window.open(urlToOpen, '_blank');
  };

  return (
    <Card sx={{ display: 'flex', height: "200px" }} style={{ boxShadow: "0 -2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.2)" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', paddingBottom: 0 }}>
          <Typography
            component="div"
            variant="h7"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: 4,
            }}
          >
            {postData.title}
          </Typography>
          <Typography variant="subtitle3" color="text.secondary" component="div" sx={{ marginTop: 'auto' }}>
            {postData.artist}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <IconButton aria-label="play" onClick={handleButtonClick}>
            <PlayArrow sx={{ height: 38, width: 38 }} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
        src={postData.coverUrl}
        alt={`${postData.title} album cover`}
      />
    </Card>
  );
}