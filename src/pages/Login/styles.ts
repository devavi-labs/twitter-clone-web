import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { type, secondary } }) => ({
  root: {
    backgroundColor: secondary.main,
    padding: "1rem",
  },
  container: {
    flex: 1,
    maxWidth: "600px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    textAlign: "center",
    margin: "1rem 0",
    opacity: type === "dark" ? 0.8 : 1,
  },
  logo: {
    margin: "0 auto",
    opacity: type === "dark" ? 0.8 : 1,
  },
  extraLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1.2rem 0",
    gridColumnGap: "0.4rem",
  },
}));
