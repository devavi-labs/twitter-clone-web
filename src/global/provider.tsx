import {
  ConfirmDialogProvider,
  DrawerProvider,
  InstantSearchProvider,
  RecentSearchesProvider,
  ThemeProvider,
  ToastProvider,
} from ".";

export const GlobalContextProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <DrawerProvider>
        <ToastProvider>
          <ConfirmDialogProvider>
            <InstantSearchProvider>
              <RecentSearchesProvider>{children}</RecentSearchesProvider>
            </InstantSearchProvider>
          </ConfirmDialogProvider>
        </ToastProvider>
      </DrawerProvider>
    </ThemeProvider>
  );
};
