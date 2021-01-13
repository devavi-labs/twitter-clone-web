import React from "react";
import { TopProgressBar } from "../components";
import { ConfirmDialogContext } from "../context/confimDialog";
import { ToastContext } from "../context/toast";
import { useLogoutMutation } from "../generated/graphql";

export const Logout = () => {
  const { handleOpen: handleToastOpen } = React.useContext(ToastContext)!;
  const { handleOpen: handleDialogOpen, onClose } = React.useContext(
    ConfirmDialogContext
  )!;

  const [{ fetching }, logout] = useLogoutMutation();

  const handleLogout = React.useCallback(async () => {
    onClose && onClose();

    const { data, error } = await logout();

    if (data && data.logout) {
      handleToastOpen("Logged out");
    }

    if (error) {
      handleToastOpen("Couldn't log out");
    }
  }, [handleToastOpen, logout, onClose]);

  const handleConfirmLogout = React.useCallback(async () => {
    handleDialogOpen({
      title: "Log out of Quacker?",
      content: `You can always log back in at any time.`,
      confirmLabel: "Log out",
      onConfirm: handleLogout,
      danger: false,
      includeLogo: true,
    });
  }, [handleDialogOpen, handleLogout]);

  React.useEffect(() => {
    handleConfirmLogout();
  }, [handleConfirmLogout]);

  return (
    <>
      <TopProgressBar visible={fetching} />
    </>
  );
};
