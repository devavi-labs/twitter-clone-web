import { RegularUserFragment } from "./generated/graphql";

export interface QuackContentType {
  text: string;
  hashtags?: string[] | null | undefined;
  mentions?: RegularUserFragment[] | null | undefined;
  links?: string[] | null | undefined;
}
