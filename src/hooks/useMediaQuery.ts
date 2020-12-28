import { useMediaQuery as useMQ, Theme } from "@material-ui/core";

export const useMediaQuery = () => {
  const xl = useMQ((theme: Theme) => theme.breakpoints.down("xl"));
  const lg = useMQ((theme: Theme) => theme.breakpoints.down("lg"));
  const md = useMQ((theme: Theme) => theme.breakpoints.down("md"));
  const sm = useMQ((theme: Theme) => theme.breakpoints.down("sm"));
  const xs = useMQ((theme: Theme) => theme.breakpoints.down("xs"));

  return { xl, lg, md, sm, xs };
};
