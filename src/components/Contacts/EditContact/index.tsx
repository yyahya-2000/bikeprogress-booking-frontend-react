import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import DrawerContainer from 'components/common/Drawer';

const EditContactPage: FC = () => {
  return <DrawerContainer></DrawerContainer>;
};

export default observer(EditContactPage);
