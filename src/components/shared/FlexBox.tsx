import { Box, BoxProps } from "@mui/material";

const FlexBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box {...props}>{children}</Box>
);

FlexBox.defaultProps = {
  display: "flex",
};

export default FlexBox;
