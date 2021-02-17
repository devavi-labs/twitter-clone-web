import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { type } }) => ({
  heading: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    opacity: type === "dark" ? 0.8 : 1,
  },
}));
