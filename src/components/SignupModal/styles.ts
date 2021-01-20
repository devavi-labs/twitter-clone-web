import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { type } }) => ({
  logo: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    alignSelf: "flex-start",
    margin: "0.5rem 0",
    opacity: type === "dark" ? 0.8 : 1,
  },
}));
