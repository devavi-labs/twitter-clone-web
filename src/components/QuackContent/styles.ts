import { makeStyles, Theme } from "@material-ui/core/styles";
import { QuackContentProps } from ".";

export const useStyles = makeStyles<Theme, Pick<QuackContentProps, "variant">>(
  ({ palette: { text } }) => ({
    root: {
      paddingRight: "2rem",
      paddingTop: ({ variant }) => (variant === "open" ? "1rem" : 0),
    },
    text: {
      color: text.primary,
      fontSize: ({ variant }) => (variant === "open" ? "1.1rem" : "0.9rem"),
      opacity: 0.9,
    },
  })
);
