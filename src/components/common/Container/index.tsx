import { FC } from 'react';
import { Box } from '@mui/material';
import { ContainerProps } from 'models/types';
import useContainerStyle from './Container.styles';

const Container: FC<ContainerProps> = ({ children }) => {
  const classes = useContainerStyle();
  return <Box className={classes.root}>{children}</Box>;
};

export default Container;
