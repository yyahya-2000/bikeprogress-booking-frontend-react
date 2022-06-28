import { Box, CircularProgress } from '@mui/material';
import { SpinerProps } from 'models/types';
import { FC } from 'react';

const Spiner: FC<SpinerProps> = ({ isFone = false }) => (
  <Box
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    height={'100vh'}
    style={{ background: isFone ? 'white' : 'none' }}
  >
    <Box>
      <CircularProgress color={'primary'} size={140} />
    </Box>
  </Box>
);

export default Spiner;
