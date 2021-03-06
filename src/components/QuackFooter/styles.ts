import { makeStyles, Theme } from "@material-ui/core/styles";
import { QuackFooterProps } from ".";

export const useStyles = makeStyles<Theme, Pick<QuackFooterProps, "variant">>(
  () => ({
    root: {
      display: "flex",
      justifyContent: ({ variant }) =>
        variant === "open" ? "space-around" : "space-between",
      alignItems: "center",
      padding: ({ variant }) => (variant === "open" ? "0.5rem 0" : 0),
    },
  })
);
