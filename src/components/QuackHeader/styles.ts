import { makeStyles, Theme } from "@material-ui/core/styles";
import { QuackHeaderProps } from ".";

export const useStyles = makeStyles<Theme, Pick<QuackHeaderProps, "variant">>(
  () => ({
    root: {
      width: "100%",
      display: "flex",
      alignItems: ({ variant }) =>
        variant === "open" ? "flex-start" : "center",
      justifyContent: "space-between",
    },
    texts: {
      display: "flex",
      alignItems: "center",
    },
  })
);
