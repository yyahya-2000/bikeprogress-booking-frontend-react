import { MenuItem } from 'models/types';
import { routes } from 'routers';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export const menuItems: MenuItem[] = [
  { 
    text: 'Главная',
    icon: <HomeOutlinedIcon />,
    navigationLink: routes.home },
  {
    text: 'Контакты',
    icon: <ContactsOutlinedIcon />,
    navigationLink: routes.contacts,
  },
  {
    text: 'Пользователи',
    icon: <PeopleAltOutlinedIcon />,
    navigationLink: routes.users,
  },
  {
    text: 'Страница',
    icon: <ArticleOutlinedIcon />,
    navigationLink: routes.page,
  },
  {
    text: 'Помощь',
    icon: <ContactSupportOutlinedIcon />,
    navigationLink: routes.help,
  },
];
