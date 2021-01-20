import {
  ConfirmDialogProvider,
  DrawerProvider,
  InstantSearchProvider,
  RecentSearchesProvider,
  ThemeProvider,
  ToastProvider,
  UserPopperProvider,
} from ".";

export const GlobalContextProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <UserPopperProvider>
        <DrawerProvider>
          <ToastProvider>
            <ConfirmDialogProvider>
              <InstantSearchProvider>
                <RecentSearchesProvider>{children}</RecentSearchesProvider>
              </InstantSearchProvider>
            </ConfirmDialogProvider>
          </ToastProvider>
        </DrawerProvider>
      </UserPopperProvider>
    </ThemeProvider>
  );
};
