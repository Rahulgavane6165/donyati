import React from 'react';

const VideoBackground = () => {
  return (
    <div className="relative overflow-hidden h-screen w-screen">
      <video
        autoPlay
        muted
        loop
        className="absolute object-cover w-full h-full brightness-50"
      >
        <source src="/assets/DonyatiEPM.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
