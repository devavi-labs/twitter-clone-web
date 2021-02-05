import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import { Modal, PaginatedUsers } from "..";
import {
  LikesByQuackIdQueryVariables,
  RequacksByQuackIdQueryVariables,
  useLikesByQuackIdQuery,
  useRequacksByQuackIdQuery,
} from "../../generated/graphql";
import { useStyles } from "./styles";

type QuackStatsModalProps = {
  type: "requacks" | "likes";
  open?: boolean;
  onClose?: () => any;
};

const QuackStatsModal: React.FC<QuackStatsModalProps> = ({
  type,
  open = true,
  onClose,
}) => {
  const classes = useStyles();

  const { quackId } = useParams<{
    quackId?: string;
  }>();

  const history = useHistory();

  const [variables, setVariables] = React.useState<
    RequacksByQuackIdQueryVariables & LikesByQuackIdQueryVariables
  >({
    quackId: parseInt(quackId ?? "0"),
    limit: 20,
    lastIndex: null,
  });

  const [
    { data: requacksData, fetching: requacksFetching, error: requacksError },
  ] = useRequacksByQuackIdQuery({
    variables,
    pause: !quackId || type === "likes",
  });
  const [
    { data: likesData, fetching: likesFetching, error: likesError },
  ] = useLikesByQuackIdQuery({
    variables,
    pause: !quackId || type === "requacks",
  });

  const loadMore = () => {
    if (type === "requacks") {
      if (
        requacksData?.requacksByQuackId?.users &&
        requacksData.requacksByQuackId.users.length > 0
      ) {
        const { users } = requacksData.requacksByQuackId;
        setVariables((v) => ({
          ...v,
          lastIndex: users[users.length - 1].id,
        }));
      }
    } else {
      if (
        likesData?.likesByQuackId?.users &&
        likesData.likesByQuackId.users.length > 0
      ) {
        const { users } = likesData.likesByQuackId;
        setVariables((v) => ({
          ...v,
          lastIndex: users[users.length - 1].id,
        }));
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose || history.goBack}
      header={
        <div className={classes.header}>
          <IconButton onClick={onClose || history.goBack}>
            <BsX className={classes.backIcon} />
          </IconButton>
          <Typography className={classes.heading}>
            {type === "requacks" ? "Requacked by" : "Liked by"}
          </Typography>
        </div>
      }
      disableBackdropClick={false}
      padding="0px"
      top="5%"
    >
      <div className={classes.body}>
        {type === "requacks" ? (
          <PaginatedUsers
            users={requacksData?.requacksByQuackId?.users}
            hasMore={requacksData?.requacksByQuackId?.hasMore}
            loading={requacksFetching}
            error={
              requacksError
                ? requacksError.networkError
                  ? "network"
                  : "other"
                : undefined
            }
            next={loadMore}
          />
        ) : (
          <PaginatedUsers
            users={likesData?.likesByQuackId?.users}
            hasMore={likesData?.likesByQuackId?.hasMore}
            loading={likesFetching}
            error={
              likesError
                ? likesError.networkError
                  ? "network"
                  : "other"
                : undefined
            }
            next={loadMore}
          />
        )}
      </div>
    </Modal>
  );
};

export { QuackStatsModal };
