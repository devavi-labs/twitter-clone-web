import { Avatar, Box, Divider, IconButton, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BaseEmoji } from "emoji-mart";
import { EmojiPickerPopper } from ".";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CharacterLengthProgress, RoundedButton, TopProgressBar } from ".";
import { useMeQuery, useQuackMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import { usePopper } from "../hooks/usePopper";
import { GoSmiley } from "react-icons/go";

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
  rows?: number;
}

export const CreateQuack: React.FC<CreateQuackProps> = ({
  bottomDivider = true,
  rows = 1,
}) => {
  const useStyles = makeStyles(({ palette: { primary, type } }) => ({
    root: {
      width: "100%",
      flex: 1,
      display: "flex",
      marginBottom: "0.5rem",
    },
    left: {
      padding: " 0.5rem 1rem",
    },
    avatar: {
      width: "3rem",
      height: "3rem",
    },
    right: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      paddingRight: "1rem",
      type,
    },
    input: {
      width: "100%",
      padding: "1rem 0",
      color: type === "dark" ? "rgba(255,255,255,0.8)" : "#000",
      fontSize: "1.1rem",
      margin: "1em 0",
    },
    footer: {
      marginTop: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    footerEnd: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    icon: {
      color: primary.main,
    },
    btn: {
      alignSelf: "flex-end",
      "&:disabled": {
        backgroundColor: primary.main,
        opacity: 0.6,
      },
    },
  }));

  const classes = useStyles();

  const [{ data }] = useMeQuery();
  const [, quack] = useQuackMutation();

  const onSubmit = async (
    values: QuackValues,
    { setErrors, resetForm }: FormikHelpers<QuackValues>
  ) => {
    const { data } = await quack({ input: values });

    if (data?.quack?.errors) {
      const errors = mapErrors(data?.quack?.errors);
      setErrors(errors);
    }

    resetForm();
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
    <>
      <Box className={classes.root}>
        <Box className={classes.left}>
          <Avatar src={data?.me?.displayPicture} className={classes.avatar} />
        </Box>

        <form onSubmit={formik.handleSubmit} className={classes.right}>
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
            rows={rows}
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
      </Box>
      {bottomDivider && <Divider />}
      <EmojiPickerPopper
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        onSelect={onEmojiSelect}
      />
    </>
  );
};
