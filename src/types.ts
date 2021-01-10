import { ShortUserFragment } from "./generated/graphql";

export interface QuackContentType {
  text: string;
  hashtags?: string[] | null | undefined;
  mentions?: ShortUserFragment[] | null | undefined;
  links?: string[] | null | undefined;
}
