import { Box, Divider, IconButton, InputBase } from "@material-ui/core";
import { BaseEmoji } from "emoji-mart";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { GoSmiley } from "react-icons/go";
import * as Yup from "yup";
import {
  CharacterLengthProgress,
  EmojiPickerPopper,
  QuackLayout,
  RoundedButton,
  TopProgressBar,
  UserAvatar,
} from "..";
import { useMeQuery, useQuackMutation } from "../../generated/graphql";
import { usePopper } from "../../hooks";
import { mapErrors } from "../../utils/mapErrors";
import { useStyles } from "./styles";

type QuackValues = {
  text: string;
};

const initialValues: QuackValues = {
  text: "",
};

const validationSchema = Yup.object({
  text: Yup.string().max(280).label("Quack").required(),
});

interface CreateQuackProps {
  bottomDivider?: boolean;
  inReplyToQuackId?: number;
  onDone?: () => void;
}

export const CreateQuack: React.FC<CreateQuackProps> = ({
  bottomDivider = true,
  inReplyToQuackId,
  onDone = () => {},
}) => {
  const classes = useStyles();

  const [{ data }] = useMeQuery();
  const [, quack] = useQuackMutation();

  const onSubmit = async (
    { text }: QuackValues,
    { setErrors, resetForm }: FormikHelpers<QuackValues>
  ) => {
    const { data } = await quack({ input: { text, inReplyToQuackId } });

    if (data?.quack?.errors) {
      const errors = mapErrors(data?.quack?.errors);
      setErrors(errors);
    }

    resetForm();

    return onDone();
  };

  const formik = useFormik<QuackValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const onEmojiSelect = (emoji: BaseEmoji) => {
    formik.setFieldValue("text", formik.values.text + emoji.native);
  };

  const { open, onClose, anchorEl, handleClick } = usePopper();

  return (
    <React.Fragment>
      <QuackLayout
        variant="contained"
        left={<UserAvatar user={data?.me} variant="contained" />}
        clickable={false}
      >
        <form onSubmit={formik.handleSubmit}>
          <TopProgressBar visible={formik.isSubmitting} />

          <InputBase
            id="text"
            name="text"
            placeholder="What's happening?"
            margin="dense"
            error={formik.touched.text && Boolean(formik.errors.text)}
            onChange={formik.handleChange}
            value={formik.values.text}
            aria-autocomplete="none"
            className={classes.input}
            multiline
          />

          {formik.values.text && <Divider />}
          <Box className={classes.footer}>
            <IconButton onClick={handleClick} size="small">
              <GoSmiley className={classes.icon} />
            </IconButton>
            <Box className={classes.footerEnd}>
              {Boolean(formik.values.text) && (
                <CharacterLengthProgress length={formik.values.text.length} />
              )}
              <RoundedButton
                type="submit"
                variant="contained"
                disabled={
                  formik.isSubmitting ||
                  Boolean(formik.errors.text) ||
                  !formik.values.text
                }
                color="primary"
                className={classes.btn}
              >
                Quack
              </RoundedButton>
            </Box>
          </Box>
        </form>
      </QuackLayout>

      {bottomDivider && <Divider />}

      <EmojiPickerPopper
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        onSelect={onEmojiSelect}
      />
    </React.Fragment>
  );
};
