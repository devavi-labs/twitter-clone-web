import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { type, secondary } }) => ({
  footer: {
    width: "100%",
    backgroundColor: secondary.main,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontSize: "0.8rem",
    textAlign: "center",
    opacity: type === "dark" ? 0.6 : 1,
  },
}));
