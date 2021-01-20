import { UserPopperState, OPEN, CLOSE } from ".";

export type UserPopperAction = {
  type: typeof OPEN | typeof CLOSE;
  payload?: Omit<UserPopperState, "open">;
};

export const initialUserPopperState: UserPopperState = {
  open: false,
  anchorEl: undefined,
  onClose: undefined,
  user: undefined,
};

export const userPopperReducer = (
  state: UserPopperState = initialUserPopperState,
  action: UserPopperAction
): UserPopperState => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    }

    case CLOSE: {
      return initialUserPopperState;
    }

    default: {
      return state;
    }
  }
};
