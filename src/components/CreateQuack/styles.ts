import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary, type } }) => ({
  input: {
    width: "100%",
    padding: "1rem 0",
    color: type === "dark" ? "#e6e6e6" : "#000",
    fontSize: "1.1rem",
    margin: "1em 0",
  },
  footer: {
    margin: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerEnd: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  icon: {
    color: primary.main,
  },
  btn: {
    alignSelf: "flex-end",
    "&:disabled": {
      backgroundColor: primary.main,
      opacity: 0.6,
    },
  },
}));
