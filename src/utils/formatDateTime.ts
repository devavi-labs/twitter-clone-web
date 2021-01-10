import { isBefore, formatDistanceToNowStrict, format } from "date-fns";

export const formatDate = (rawDate: unknown, allowSlicing: boolean = true) => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const date = new Date(rawDate as any);
  if (isBefore(date, yesterday)) {
    const formattedDate = format(date, "PP");
    if (allowSlicing && date.getFullYear() === today.getFullYear()) {
      return formattedDate.slice(0, -6);
    }
    return formattedDate;
  } else {
    return formatDistanceToNowStrict(date);
  }
};

export const formatTime = (rawDate: unknown) => {
  const date = new Date(rawDate as any);
  return format(date, "p");
};
