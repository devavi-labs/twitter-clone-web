import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary, text } }) => ({
  header: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  backIcon: {
    color: primary.main,
  },
  heading: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: text.primary,
    margin: "0 auto",
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
}));
