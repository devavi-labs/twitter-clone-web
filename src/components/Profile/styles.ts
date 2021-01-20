import { makeStyles, Theme } from "@material-ui/core/styles";
import { hexToRgb } from "../../utils/hexToRgb";

export const useStyles = makeStyles<
  Theme,
  { coverPicture: string | undefined }
>(({ palette: { primary, secondary, type } }) => ({
  root: {
    width: "100%",
  },
  cover: {
    width: "100%",
    height: 0,
    paddingTop: "33%",
    backgroundColor: type === "dark" ? "#2F3336" : "#C4CFD6",
    backgroundImage: ({ coverPicture }) => `url(${coverPicture})`,
    backgroundSize: "100%",
    backgroundPosition: "center",
  },
  profile: {
    padding: "0 1rem",
  },
  photoRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  avatar: {
    marginTop: "clamp(-75px, -5vw, -20px)",
    width: "clamp(85px, 10vw, 150px)",
    height: "clamp(85px, 10vw, 150px)",
    backgroundColor: type === "dark" ? "#15181C" : "#F7F9FA",
    border: "4px solid",
    borderColor: secondary.main,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  moreButton: {
    border: "0.4px solid",
    borderColor: hexToRgb(primary.main, 0.5),
    padding: "0.5rem !important",
    "&:hover": {
      borderColor: primary.main,
    },
    "&:focus": {
      borderColor: primary.main,
    },
  },
  labels: {
    display: "flex",
    alignItems: "flex-end",
    gap: "0.4rem",
    margin: "1rem 0",
  },
  fbChip: {
    fontSize: "0.7rem",
  },
  stats: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
}));
