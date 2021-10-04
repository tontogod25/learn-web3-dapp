import React from 'react';
import ReactPlayer from 'react-player';
import {StyledCard} from './VideoPlayer.styles';

const VideoPlayer = (props: any) => {
  const {url, caption} = props;

  return (
    <StyledCard
      title={caption}
      type="inner"
      bodyStyle={{display: 'flex', justifyContent: 'center'}}
    >
      <ReactPlayer url={url} />
    </StyledCard>
  );
};

export default VideoPlayer;
