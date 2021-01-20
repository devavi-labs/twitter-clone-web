import { DrawerState, OPEN, CLOSE } from ".";

export type DrawerAction = {
  type: typeof OPEN | typeof CLOSE;
  payload?: Omit<DrawerState, "open">;
};

export const initialDrawerState: DrawerState = {
  open: false,
  onClose: undefined,
};

export const drawerReducer = (
  state: DrawerState = initialDrawerState,
  action: DrawerAction
): DrawerState => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    }

    case CLOSE: {
      return {
        ...state,
        open: false,
      };
    }

    default: {
      return state;
    }
  }
};
