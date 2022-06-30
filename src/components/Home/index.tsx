import DrawerContainer from 'components/common/Drawer';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const HomePage: FC = () => {
  return <DrawerContainer>Home page</DrawerContainer>;
};

export default observer(HomePage);
