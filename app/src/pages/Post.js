import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@mui/material';
import { Favorite, Comment, PlayArrow } from '@mui/icons-material';

export function Post({ postData }) {
  return (
    <Card sx={{ maxWidth: 240 }}>
      <CardHeader
        avatar={
          <Avatar aria-label={postData.userName}>
            {postData.userName.charAt(0)}
          </Avatar>
        }
        title={postData.userName}
        subheader={postData.date}
      />
      <MediaPost postData={postData} />
      <CardContent>
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
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', height: "200px" }} style={{ boxShadow: "0 -2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.2)" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {postData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {postData.artist}
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
        sx={{ width: "50%" }}
        src={postData.coverUrl}
        alt={`${postData.title} album cover`}
      />
    </Card>
  );
}