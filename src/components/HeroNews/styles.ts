import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles<
  Theme,
  { cover: string | null | undefined }
>(({ breakpoints: { down } }) => ({
  heroNewsBox: {
    position: "relative",
    width: "100%",
    paddingTop: "60%",
    backgroundImage: ({ cover }) => `url(${cover})`,
    backgroundSize: "cover",
    cursor: "pointer",
  },
  innerBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundImage: `linear-gradient(
            to bottom,
            transparent 0%,
            black
          )`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "1rem",
    [down("xs")]: {
      padding: "0.4rem 1rem",
    },
  },
  heading: {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
  },
  secondaryText: {
    color: "#e2e2e2",
    fontSize: "0.8rem",
  },
  title: {
    color: "#ffffff",
    margin: 0,
    fontSize: "1.1rem",
  },
}));
