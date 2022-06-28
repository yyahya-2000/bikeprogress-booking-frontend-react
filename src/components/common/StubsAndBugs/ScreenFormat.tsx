import { Box } from "@mui/material";
import { FC } from "react";

const ScreenFormat: FC = () => {

  return (
    <Box style={{ width: 200, margin: "50vw auto", textAlign: "center" }}>
      Данный формат экрана не поддерживается. Воспользуйтесь телефоном, планшетом или компьютером
    </Box>
  );
};

export default ScreenFormat;