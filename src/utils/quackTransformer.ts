import { RegularQuackFragment, ShortQuackFragment } from "../generated/graphql";

interface TransformedQuack {
  inReplyTo?: RegularQuackFragment | ShortQuackFragment;
  main: RegularQuackFragment | ShortQuackFragment;
  reply?: RegularQuackFragment | ShortQuackFragment;
}

export const transform = (quack: RegularQuackFragment): TransformedQuack => {
  return {
    inReplyTo: quack.inReplyToQuack?.inReplyToQuack as ShortQuackFragment,
    main: quack.inReplyToQuack || quack,
    reply: quack.inReplyToQuack ? quack : undefined,
  };
};
