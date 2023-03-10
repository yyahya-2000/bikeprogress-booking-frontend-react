import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ContainerProps } from 'models/types';
import { FC, useState } from 'react';
import useDrawerContainerStyle from './DrawerContainer.styles';
import { companyName } from 'enums';
import { menuItems } from './Drawer.data';
import { Avatar, Button, Grid, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usersService } from 'services/users/users.service';
import { observer } from 'mobx-react-lite';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { withCookies, Cookies } from 'react-cookie';
import { routes } from 'routers';
// import { routes } from 'routers';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up(600)]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerContainer: FC<ContainerProps> = ({ children }) => {
  const { currentUser } = usersService;
  const cookies = new Cookies();
  //const [cookies, setCookie, removeCookie] = useCookies(['laravel_session']);
  // const [menuListItems, setMenuListItems] = useState<MenuItem[]>([]);
  const classes = useDrawerContainerStyle();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(!useMediaQuery('(max-width:900px)'));

  // useEffect(() => {
  //   if(currentUser.position.toLocaleLowerCase() !== '????????????????????????'){
  //     setMenuListItems(menuItems.filter((item) => item.navigationLink !== routes.users));
  //   }
  //   else {
  //     setMenuListItems(menuItems);
  //   }
  // }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    // document.cookie.split(";").forEach((c) => {
    //   document.cookie = c
    //     .replace(/^ +/, "")
    //     .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    // });

    // var cookies = document.cookie.split(";");

    // for (var i = 0; i < cookies.length; i++) {
    //     var cookie = cookies[i];
    //     var eqPos = cookie.indexOf("=");
    //     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // }

    // console.log(cookies.getAll());
    // cookies.remove('laravel_session', { path: '/', domain: 'localhost' });
    // cookies.remove('jwt', { path: '/', domain: 'localhost' });
    // cookies.remove('XSRF-TOKEN', { path: '/', domain: 'localhost' });
    // console.log(cookies.getAll());
    // localStorage.removeItem('localhost');
    

    //setCookie("laravel_session", "", { path: "/" });
    //removeCookie('laravel_session', { path: "/" });
    //(new Cookies()).remove('laravel_session');
    usersService.logout();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer variant='permanent' open={open} className={classes.sidbar}>
        <DrawerHeader style={{ justifyContent: 'space-between' }}>
          {open ? (
            <>
              <Typography
                ml={2}
                className={classes.whiteColor}
                variant='h5'
                noWrap
                component='div'
              >
                {companyName}
              </Typography>
              <IconButton
                onClick={handleDrawerClose}
                className={classes.whiteColor}
              >
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={handleDrawerOpen}
              className={classes.whiteColor}
            >
              <MenuIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List className={classes.whiteColor}>
          {menuItems.map((item, index) => (
            <ListItem
              onClick={() => navigate(item.navigationLink)}
              key={item.text}
              disablePadding
              sx={{ display: 'block' }}
              selected={
                index === 0
                  ? window.location.pathname === item.navigationLink
                  : window.location.pathname.includes(item.navigationLink)
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  className={classes.whiteColor}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box position='absolute' bottom={20} left={13}>
          <Grid display='flex' alignItems='center'>
            <Avatar />
            <Grid ml={1}>
              <Button
                className={classes.whiteColor}
                style={{ textDecoration: 'underline' }}
                variant='text'
                onClick={()=>navigate(routes.previewUser + `?id=${-1}`)}
              >
                {currentUser?.lastname.charAt(0).toUpperCase() +
                  currentUser?.lastname.slice(1).toLowerCase() +
                  ' ' +
                  currentUser?.lastname.charAt(0).toUpperCase() +
                  '.'}
              </Button>
            </Grid>
          </Grid>
          <Button
            className={classes.whiteColor}
            variant='text'
            onClick={logoutHandler}
          >
            <LogoutOutlinedIcon />
            <Grid ml={3}>{'??????????'}</Grid>
          </Button>
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default withCookies(observer(DrawerContainer));
