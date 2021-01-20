import { InstantSearchState, OPEN, UPDATE_QUERY, CLOSE } from ".";

export type InstantSearchAction = {
  type: typeof OPEN | typeof CLOSE | typeof UPDATE_QUERY;
  payload?: Omit<InstantSearchState, "open">;
};

export const initialInstantSearchState: InstantSearchState = {
  open: false,
  query: "",
};

export const instantSearchReducer = (
  state: InstantSearchState = initialInstantSearchState,
  action: InstantSearchAction
): InstantSearchState => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        open: true,
      };
    }

    case CLOSE: {
      return {
        ...state,
        open: false,
      };
    }

    case UPDATE_QUERY: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
