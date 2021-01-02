import { Avatar, Box, Divider, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as Yup from "yup";
import { RoundedButton, TopProgressBar, CharacterLengthProgress } from ".";
import { useMeQuery, useQuackMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";

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
  const useStyles = makeStyles(
    ({ palette: { primary, type, text, warning, error } }) => ({
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
      },
      footer: {
        marginTop: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "1rem",
      },
      btn: {
        alignSelf: "flex-end",
        "&:disabled": {
          backgroundColor: primary.main,
          opacity: 0.6,
        },
      },
    })
  );

  const classes = useStyles();

  const [{ data }] = useMeQuery();
  const [, quack] = useQuackMutation();

  const handleSubmit = async (
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

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.left}>
          <Avatar src={data?.me?.displayPicture} className={classes.avatar} />
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values }) => (
            <Form className={classes.right}>
              <TopProgressBar visible={isSubmitting} />
              <Field name="text">
                {({
                  field,
                  form: { touched, errors },
                }: {
                  field: any;
                  form: any;
                }) => (
                  <InputBase
                    placeholder="What's happening?"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.text && Boolean(errors.text)}
                    {...field}
                    aria-autocomplete="none"
                    className={classes.input}
                    multiline
                    rows={rows}
                  />
                )}
              </Field>
              {values.text && <Divider />}
              <Box className={classes.footer}>
                {Boolean(values.text) && (
                  <CharacterLengthProgress length={values.text.length} />
                )}
                <RoundedButton
                  type="submit"
                  variant="contained"
                  disabled={
                    isSubmitting || Boolean(errors.text) || !values.text
                  }
                  color="primary"
                  className={classes.btn}
                >
                  Quack
                </RoundedButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      {bottomDivider && <Divider />}
    </>
  );
};
