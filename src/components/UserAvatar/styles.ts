import { makeStyles, Theme } from "@material-ui/core/styles";
import { UserAvatarProps } from ".";

export const useStyles = makeStyles<Theme, Pick<UserAvatarProps, "variant">>(
  () => ({
    avatarButton: {
      padding: 0,
      margin: 0,
      "&:hover": {
        opacity: 0.8,
      },
      "&:focus": {
        opacity: 0.8,
      },
    },
    avatar: {
      width: ({ variant }) =>
        variant === "open" ? 52 : variant === "contained" ? 48 : 42,
      height: ({ variant }) =>
        variant === "open" ? 52 : variant === "contained" ? 48 : 42,
      marginRight: ({ variant }) => (variant === "open" ? "0.5rem" : 0),
    },
  })
);
