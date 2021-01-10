export const truncatedTextStyle = (
  maxWidth: number | string | undefined = "10rem"
) =>
  ({
    maxWidth,
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as const);
