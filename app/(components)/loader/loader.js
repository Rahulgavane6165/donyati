"use client"

import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="flex flex-col items-center">
        <div className="loader p-4">
          <ThreeCircles
            color="#4b4179"
            outerCircleColor="#4b4179"
            middleCircleColor="#7a9a29"
            innerCircleColor="grey"
          />
        </div>
        <div className="loaderText mt-4 text-white">
          <h4>Loading...</h4>
        </div>
      </div>
    </div>
  );
};

export default Loader;
