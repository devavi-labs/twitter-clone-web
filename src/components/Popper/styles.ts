import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles<Theme, { minWidth?: string }>(
  ({ palette: { secondary, type } }) => ({
    root: {
      backgroundColor: secondary.main,
      boxShadow: `0 0 8px 2px ${
        type === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
      }`,
      borderRadius: "12px",
      minWidth: ({ minWidth }) => minWidth,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      padding: 0,
    },
  })
);
