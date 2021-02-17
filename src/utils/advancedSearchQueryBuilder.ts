import { AdvancedSearchValues } from "../types";
import format from "date-fns/format";

export const buildQueryForAdvancedSearch = (
  values: AdvancedSearchValues,
  initialValues: AdvancedSearchValues
) => {
  let queries: Set<string> = new Set();

  if (values.words.like) {
    queries.add(values.words.like);
  }

  if (values.words.exactPhrase) {
    queries.add(`"${values.words.exactPhrase}"`);
  }

  if (values.words.or) {
    queries.add(values.words.or.split(", ").join(" OR "));
  }

  if (values.words.notTheseWords) {
    queries.add(
      values.words.notTheseWords
        .split(", ")
        .map((word) => `-${word}`)
        .join(" ")
    );
  }

  if (values.words.hashtags) {
    queries.add(
      values.words.hashtags
        .split(", ")
        .map((word) => {
          const _word = word.replace(/#/g, "");
          return `#${_word}`;
        })
        .join(" ")
    );
  }

  if (values.accounts.fromTheseUsernames) {
    queries.add(
      values.accounts.fromTheseUsernames
        .split(", ")
        .map((word) => {
          const _word = word.replace(/@/g, "");
          return `from:${_word}`;
        })
        .join(" ")
    );
  }

  if (values.accounts.toTheseUsernames) {
    queries.add(
      values.accounts.toTheseUsernames
        .split(", ")
        .map((word) => {
          const _word = word.replace(/@/g, "");
          return `to:${_word}`;
        })
        .join(" ")
    );
  }

  if (values.accounts.mentions) {
    queries.add(
      values.accounts.mentions
        .split(", ")
        .map((word) => {
          const _word = word.replace(/@/g, "");
          return `@${_word}`;
        })
        .join(" ")
    );
  }

  if (values.filters.replies.on) {
    if (values.filters.replies.value === "include") {
      queries.add("filter:replies");
    } else {
      queries.add("-filter:replies");
    }
  }

  if (values.filters.links.on) {
    if (values.filters.links.value === "include") {
      queries.add("filter:links");
    } else {
      queries.add("-filter:links");
    }
  }

  if (values.engagement.minReplies) {
    queries.add(`min_replies:${values.engagement.minReplies}`);
  }

  if (values.engagement.minLikes) {
    queries.add(`min_likes:${values.engagement.minLikes}`);
  }

  if (values.engagement.minRequacks) {
    queries.add(`min_requacks:${values.engagement.minRequacks}`);
  }

  if (values.dates.since !== initialValues.dates.since) {
    queries.add(`since:${format(values.dates.since, "yyyy-MM-dd")}`);
  }

  if (values.dates.until !== initialValues.dates.until) {
    queries.add(`until:${format(values.dates.until, "yyyy-MM-dd")}`);
  }

  return Array.from(queries).join(" ");
};
