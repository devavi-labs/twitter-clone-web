import React from "react";

type InstantSearchResultsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ISearchResultContext = React.createContext<InstantSearchResultsType | null>(
  null
);

export const ISearchResultContextProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string | undefined>();

  return (
    <ISearchResultContext.Provider
      value={{
        open,
        setOpen,
        query,
        setQuery,
      }}
    >
      {children}
    </ISearchResultContext.Provider>
  );
};
