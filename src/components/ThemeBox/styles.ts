import { makeStyles, Theme } from "@material-ui/core/styles";
import { ThemeBoxProps } from ".";

export const useStyles = makeStyles<Theme, ThemeBoxProps>(
  ({ palette: { primary }, breakpoints: { down } }) => ({
    themeBox: {
      width: "50%",
      height: "60px",
      margin: 0,
      borderRadius: "4px",
      border: ({ selected }) => (selected ? `2px solid ${primary.main}` : ""),
      background: ({ theme }) => (theme === "dark" ? "#000" : "#fff"),
      [down("xs")]: {
        width: "100%",
      },
    },
    label: {
      color: ({ theme }) =>
        theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "#000",
      fontSize: "0.9rem",
      fontWeight: "bold",
    },
    radio: {
      marginRight: "1rem",
      color: ({ theme }) =>
        theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "#000",
    },
    icon: {
      color: primary.main,
    },
  })
);
