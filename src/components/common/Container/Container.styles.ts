import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useContainerStyle = makeStyles((theme: Theme) => ({
  root: {
    width: 1440,
    margin: "0px auto",
    [theme.breakpoints.up("mobileVertical")]: {
      width: "100%",
    },
    [theme.breakpoints.up("mobileHorisontal")]: {
      width: "100%",
    },
    [theme.breakpoints.up("tablet")]: {
      width: 600,
    },
    [theme.breakpoints.up("tabletVertical")]: {
      width: 768,
    },
    [theme.breakpoints.up("tabletHorisontal")]: {
      width: 1024,
    },
    [theme.breakpoints.up("laptop")]: {
      width: 1280,
    },
    [theme.breakpoints.up("desktop")]: {
      width: 1440,
    },
  },
}));

export default useContainerStyle;
