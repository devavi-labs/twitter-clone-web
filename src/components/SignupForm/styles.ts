import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette }) => ({
  paragraph: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    opacity: palette.type === "dark" ? 0.8 : 1,
  },
}));
