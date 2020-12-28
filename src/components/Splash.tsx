import { Box } from "@material-ui/core";
import { Logo } from ".";

export const Splash: React.FC<any> = () => (
  <Box
    bgcolor="primary.main"
    height="100vh"
    width="100vw"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Logo size="sm" variant="white" />
  </Box>
);
