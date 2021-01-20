import React from "react";
import { TopProgressBar } from "../../components";
import { useToast, useConfirmDialog } from "../../hooks";
import { useLogoutMutation } from "../../generated/graphql";
import { useHistory } from "react-router-dom";

export const Logout = () => {
  const [, { handleOpen: handleToastOpen }] = useToast();
  const [, { handleOpen: handleDialogOpen, handleClose }] = useConfirmDialog();
  const history = useHistory();

  const [{ fetching }, logout] = useLogoutMutation();

  const handleLogout = React.useCallback(async () => {
    const { data, error } = await logout();

    if (data && data.logout) {
      handleToastOpen("Logged out");
    }

    if (error) {
      handleToastOpen("Couldn't log out");
    }
  }, [handleToastOpen, logout]);

  const handleConfirmLogout = React.useCallback(async () => {
    handleDialogOpen({
      title: "Log out of Quacker?",
      content: `You can always log back in at any time.`,
      confirmLabel: "Log out",
      onConfirm: handleLogout,
      onCancel: () => history.replace("/home"),
      danger: false,
      includeLogo: true,
    });
  }, [handleDialogOpen, handleLogout, history]);

  React.useEffect(() => {
    handleConfirmLogout();

    return handleClose;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopProgressBar visible={fetching} />
    </>
  );
};
