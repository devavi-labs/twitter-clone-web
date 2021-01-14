import { RegularQuackFragment } from "../generated/graphql";

interface TransformedQuack {
  inReplyTo?: RegularQuackFragment;
  main: RegularQuackFragment;
  reply?: RegularQuackFragment;
}

export const transform = (quack: RegularQuackFragment): TransformedQuack => {
  return {
    inReplyTo: quack.inReplyToQuack?.inReplyToQuack as RegularQuackFragment,
    main:
      (quack.inReplyToQuack as RegularQuackFragment) ||
      (quack as RegularQuackFragment),
    reply: quack.inReplyToQuack ? quack : undefined,
  };
};
