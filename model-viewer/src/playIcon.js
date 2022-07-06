import React from 'react';

export const PlayIcon = ({ color = '#1D1D1B', width = 16, height = 16, ...rest }) => {
  return (
    <span {...rest}>
      <svg
        fill={color}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        viewBox="0 0 24 24"
      >
        <g>
          <path
            fill={color}
            d="m10 16.5 6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          />
        </g>
      </svg>
    </span>
  );
};
