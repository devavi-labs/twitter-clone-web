import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { type, primary, secondary }, breakpoints: { down } }) => ({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      backgroundColor: secondary.main,
      [down("sm")]: {
        flexDirection: "column-reverse",
      },
    },
    leftBox: {
      flex: 1,
      backgroundColor: primary.light,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('logo-blue512.png')",
      backgroundPosition: "right",
      backgroundRepeat: "no-repeat",
      padding: "0 1em",
      backgroundSize: "140%",
      [down("sm")]: {
        backgroundSize: "contain",
      },
      [down("xs")]: {
        backgroundSize: "100%",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      },
    },
    list: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      gridRowGap: "1rem",
    },
    listItemText: {
      color: "white",
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginLeft: "-1rem",
    },
    rightBox: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 1em",
      [down("sm")]: {
        paddingTop: "1rem",
        paddingBottom: "1rem",
      },
    },
    rightBoxInner: {
      maxWidth: "400px",
    },
    logo: {
      opacity: type === "dark" ? 0.8 : 1,
    },
    paragraph: {
      fontSize: "1.9rem",
      fontWeight: "bold",
      marginTop: "1rem",
      marginBottom: "4rem",
      opacity: type === "dark" ? 0.8 : 1,
    },
    callText: {
      fontSize: "0.9rem",
      fontWeight: "bold",
      marginBottom: "0.5em",
      opacity: type === "dark" ? 0.8 : 1,
    },
    buttons: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    },
    bottomBox: {
      flex: 1,
      display: "none",
      [down("sm")]: {
        display: "unset",
      },
    },
    bottomBoxInner: {
      display: "flex",
      maxWidth: "400px",
      margin: "2rem auto",
      gridColumnGap: "1rem",
      padding: "0 1em",
    },
  })
);
