import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary, type, text } }) => ({
  loading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem 0",
  },
}));
