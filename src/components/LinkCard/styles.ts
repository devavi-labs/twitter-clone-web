import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    borderRadius: "0.6rem",
    padding: 0,
    marginBottom: "0.4rem",
  },
  innerRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    textTransform: "none",
  },
  right: {
    flex: 8,
    width: "100%",
  },
  cardImage: {
    maxHeight: 260,
    width: "100%",
    objectFit: "cover",
    borderTopLeftRadius: "0.6rem",
    borderTopRightRadius: "0.6rem",
  },
  content: {
    flex: 2,
    padding: "0.8rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
  },
  title: {
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  description: {
    fontSize: "0.9rem",
  },
  url: {
    fontSize: "0.9rem",
    opacity: 0.5,
  },
}));
