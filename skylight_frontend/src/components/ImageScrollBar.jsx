/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box } from '@chakra-ui/react';

export default function ImageScrollBar({ data }) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <Box>
      {data.map((item) => (
        <Box
          key={item.id}
          width='910px'
          itemId={item.id}
          overflow='hidden'
          p='1'
          style={{ filter: loaded ? 'none' : 'blur(8px)' }}
        >
          <img
            src={item.url}
            width={1000}
            height={500}
            alt={`property-${item.id}`}
            style={{ display: 'block', width: '100%', height: 'auto' }}
            onLoad={handleImageLoad}
          />
        </Box>
      ))}
    </Box>
  );
}
