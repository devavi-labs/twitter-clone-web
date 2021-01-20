import { makeStyles } from "@material-ui/core/styles";
import { hexToRgb } from "../../utils/hexToRgb";

export const useStyles = makeStyles(
  ({ palette: { primary, text }, breakpoints: { down } }) => ({
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    backIcon: {
      color: primary.main,
    },
    heading: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginTop: "1rem",
      color: text.primary,
      margin: "0 auto",
      [down("xs")]: {
        marginTop: 0,
      },
    },
    subHeading: {
      textAlign: "center",
      fontSize: "0.9rem",
      marginTop: "-0.5rem",
      color: text.primary,
      opacity: 0.7,
    },
    group: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "1rem 0",
    },
    groupLabel: {
      fontSize: "0.8rem",
      fontWeight: "bold",
      opacity: 0.6,
      alignSelf: "flex-start",
      margin: "0.5rem 0",
      color: text.primary + " !important",
    },
    settingsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "nowrap",
      gap: "1rem",
      background: hexToRgb(primary.main, 0.2),
      borderRadius: "1rem",
      padding: "0.5rem 1rem",
      [down("xs")]: {
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.5rem",
      },
    },
  })
);
