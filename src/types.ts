import { RegularUserFragment } from "./generated/graphql";

export interface QuackContentType {
  text: string;
  hashtags?: string[] | null | undefined;
  mentions?: RegularUserFragment[] | null | undefined;
  links?: string[] | null | undefined;
}

export type AdvancedSearchValues = {
  words: {
    like: string;
    exactPhrase: string;
    or: string;
    notTheseWords: string;
    hashtags: string;
  };
  accounts: {
    fromTheseUsernames: string;
    toTheseUsernames: string;
    mentions: string;
  };
  filters: {
    replies: {
      on: boolean;
      value: "include" | "exclude";
    };
    links: {
      on: boolean;
      value: "include" | "exclude";
    };
  };
  engagement: {
    minReplies: string;
    minLikes: string;
    minRequacks: string;
  };
  dates: {
    since: Date;
    until: Date;
  };
};
