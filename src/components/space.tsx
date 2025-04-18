import React from 'react';

type SpaceProps = {
  size?: number | string; // e.g., 8, '1rem', '2em'
  direction?: 'horizontal' | 'vertical';
};

export const Space: React.FC<SpaceProps> = ({
  size = 8,
  direction = 'vertical',
}) => {
  const style =
    direction === 'vertical'
      ? { height: typeof size === 'number' ? `${size}px` : size, opacity: 0 }
      : { width: typeof size === 'number' ? `${size}px` : size, opacity: 0 };

  return <div style={style} />;
};
