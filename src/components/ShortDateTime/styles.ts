import { makeStyles, Theme } from "@material-ui/core/styles";
import { truncatedTextStyle } from "../../utils/truncatedTextStyle";
import { ShortDateTimeProps } from ".";

export const useStyles = makeStyles<Theme, Pick<ShortDateTimeProps, "size">>(
  ({ palette: { text } }) => ({
    time: {
      color: text.primary,
      fontSize: ({ size }) => (size === "md" ? "0.9rem" : "0.8rem"),
      opacity: 0.6,
      ...truncatedTextStyle(),
      margin: ({ size }) => (size === "md" ? "0.4rem 0" : 0),
    },
  })
);
