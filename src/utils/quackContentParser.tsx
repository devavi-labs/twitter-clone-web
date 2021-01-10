import twitter from "twitter-text";
import { Hashtag, Link, Mention } from "../components";

export const parse = (text: string) => {
  const entities = twitter.extractEntitiesWithIndices(text);

  const _: (string | JSX.Element)[] = text.split("");

  let i = 0;
  entities.forEach((e) => {
    if ("url" in e) {
      _[e.indices[0] - i] = <Link link={e.url} />;
    } else if ("hashtag" in e) {
      _[e.indices[0] - i] = <Hashtag hashtag={e.hashtag} />;
    } else if ("screenName" in e) {
      _[e.indices[0] - i] = <Mention username={e.screenName} />;
    }

    let start = e.indices[0] + 1 - i;
    let length = e.indices[1] - e.indices[0] - 1;
    i = length;
    _.splice(start, length);
  });

  return _;
};
