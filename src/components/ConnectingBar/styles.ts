import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  connectingBar: {
    width: 2,
    flex: 1,
    marginTop: "0.4rem",
    background: text.primary,
    opacity: 0.2,
  },
}));
