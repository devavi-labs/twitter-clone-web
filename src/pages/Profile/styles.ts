import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { secondary, text } }) => ({
  profile: {
    backgroundColor: secondary.main,
  },
  loading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem 0",
  },
  container: {
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.6rem",
    textAlign: "center",
    padding: "0 1rem",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  content: {
    fontSize: "0.9rem",
    color: text.secondary,
  },
  tab: {
    textTransform: "none",
    fontWeight: "bold",
  },
}));
