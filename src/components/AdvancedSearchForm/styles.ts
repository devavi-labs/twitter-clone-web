import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { type, primary } }) => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    opacity: type === "dark" ? 0.8 : 1,
    margin: "1rem 0",
  },
  subHeading: {
    fontSize: "1rem",
    fontWeight: "bold",
    opacity: type === "dark" ? 0.8 : 1,
  },
  fullWidth: { width: "100%" },
  rowSB: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    color: primary.main,
    fontSize: "1.1rem",
  },
  searchButton: {
    margin: "1rem 0",
  },
}));
