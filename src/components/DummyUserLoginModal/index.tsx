import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Modal, PaginatedUsers } from "..";
import {
  DummyUsersQueryVariables,
  RegularUserFragment,
  useDummyUsersQuery,
  useLoginAsDummyUserMutation,
} from "../../generated/graphql";
import { RouteStateType } from "../../routes";
import { saveTokens } from "../../utils/manageTokens";
import { useStyles } from "./styles";

interface DummyUserLoginModalProps {
  open?: boolean;
  onClose?: () => any;
}

export const DummyUserLoginModal: React.FC<DummyUserLoginModalProps> = ({
  open = true,
  onClose,
}) => {
  const classes = useStyles();

  const [variables, setVariables] = React.useState<DummyUsersQueryVariables>({
    limit: 20,
    lastIndex: null,
  });

  const [{ data, fetching, error }] = useDummyUsersQuery({
    variables,
  });

  const loadMore = () => {
    if (data?.dummyUsers?.users && data.dummyUsers.users.length > 0) {
      const { users } = data.dummyUsers;
      setVariables((v) => ({
        ...v,
        lastIndex: users[users.length - 1].id,
      }));
    }
  };

  const [, login] = useLoginAsDummyUserMutation();

  const {
    replace,
    goBack,
    location: { state },
  } = useHistory<RouteStateType>();

  const handleLogin = async (user: RegularUserFragment | null | undefined) => {
    const { data } = await login({ userId: user!.id });

    if (data?.loginAsDummyUser.user) {
      saveTokens(
        data?.loginAsDummyUser.accessToken!,
        data?.loginAsDummyUser.refreshToken!
      );

      if (state?.from) return replace(state.from.pathname);
      else return replace("/home");
    }

    if (data?.loginAsDummyUser.errors) {
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose || goBack}
      header={
        <div className={classes.header}>
          <IconButton onClick={onClose || goBack}>
            <BsX className={classes.backIcon} />
          </IconButton>
          <Typography className={classes.heading}>
            Login as a dummy user
          </Typography>
        </div>
      }
      disableBackdropClick={false}
      padding="0px"
    >
      <div className={classes.body}>
        <PaginatedUsers
          users={data?.dummyUsers?.users}
          hasMore={data?.dummyUsers?.hasMore}
          loading={fetching}
          error={error ? (error.networkError ? "network" : "other") : undefined}
          next={loadMore}
          onUserClick={handleLogin}
        />
      </div>
    </Modal>
  );
};
