import { Box } from "@mui/material";

type MainPageContainerProps = {
  children?: React.ReactNode;
};

const MainPageContainer = ({ children }: MainPageContainerProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        p: "10px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default MainPageContainer;
