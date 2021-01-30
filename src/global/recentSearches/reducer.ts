import { RECENT_SEARCHES } from "../../utils/constants";
import { RecentSearchesState, GET, FLUSH, PULL, PUSH } from ".";

export type RecentSearchesAction = {
  type: typeof GET | typeof FLUSH | typeof PULL | typeof PUSH;
  payload?: string;
};

export const initialRecentSearches: RecentSearchesState = {
  searches: Array<string>(),
};

export const recentSearchesReducer = (
  state: RecentSearchesState = initialRecentSearches,
  action: RecentSearchesAction
): RecentSearchesState => {
  switch (action.type) {
    case GET: {
      const _string = localStorage.getItem(RECENT_SEARCHES);

      if (_string) {
        return {
          searches: JSON.parse(_string) as Array<string>,
        };
      }

      return initialRecentSearches;
    }
    case FLUSH: {
      localStorage.removeItem(RECENT_SEARCHES);
      return initialRecentSearches;
    }
    case PULL: {
      if (action.payload) {
        const _string = localStorage.getItem(RECENT_SEARCHES);

        const _array = _string
          ? (JSON.parse(_string) as Array<string>)
          : Array<string>();

        if (_array.includes(action.payload)) {
          _array.splice(_array.indexOf(action.payload), 1);
          localStorage.setItem(RECENT_SEARCHES, JSON.stringify(_array));

          return {
            searches: _array,
          };
        }

        return state;
      }

      return state;
    }
    case PUSH: {
      if (action.payload) {
        const _string = localStorage.getItem(RECENT_SEARCHES);

        let _array = _string
          ? (JSON.parse(_string) as Array<string>)
          : Array<string>();

        _array.unshift(action.payload);

        if (_array.length > 3) {
          _array = _array.slice(0, 4);
        }

        localStorage.setItem(RECENT_SEARCHES, JSON.stringify(_array));

        return {
          searches: _array,
        };
      }

      return state;
    }
    default:
      return state;
  }
};
