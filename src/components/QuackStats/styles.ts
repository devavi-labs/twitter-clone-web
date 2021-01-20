import { makeStyles } from "@material-ui/core/styles";
import { truncatedTextStyle } from "../../utils/truncatedTextStyle";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  primaryText: {
    color: text.primary,
    opacity: 0.9,
    fontSize: "0.9rem",
    fontWeight: "bold",
    ...truncatedTextStyle(),
  },
  secondaryText: {
    color: text.secondary,
    fontSize: "0.8rem",
    ...truncatedTextStyle(),
  },
  stats: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem 0",
  },
  stat: {
    fontSize: "1.1rem !important",
    display: "flex",
    alignItems: "flex-end",
    gap: "0.2rem",
  },
}));
