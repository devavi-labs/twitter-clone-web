import { TextField } from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { LoginButton, TopProgressBar } from ".";
import { useLoginMutation } from "../generated/graphql";
import { saveTokens } from "../utils/manageTokens";
import { mapErrors } from "../utils/mapErrors";

type LoginValues = {
  emailOrUsername: string;
  password: string;
};

const initialValues: LoginValues = {
  emailOrUsername: "",
  password: "",
};

const validationSchema = Yup.object({
  emailOrUsername: Yup.string().required().label("Email or username"),
  password: Yup.string().min(6).required().label("Password"),
});

export const LoginForm: React.FC = () => {
  const [, login] = useLoginMutation();

  const {
    replace,
    location: {
      state: { from },
    },
  } = useHistory<{ from?: string }>();

  const handleSubmit = async (
    values: LoginValues,
    { setErrors }: FormikHelpers<LoginValues>
  ) => {
    const { data } = await login(values);

    if (data?.login.user) {
      saveTokens(data?.login.accessToken!, data?.login.refreshToken!);

      if (from) return replace(from);
      else return replace("/");
    }

    if (data?.login.errors) {
      const errors = mapErrors(data?.login.errors);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <TopProgressBar visible={isSubmitting} />
          <Field name="emailOrUsername">
            {({
              field,
              form: { touched, errors },
            }: {
              field: any;
              form: any;
            }) => (
              <TextField
                label="Email or username"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                helperText={
                  touched.emailOrUsername ? errors.emailOrUsername : ""
                }
                error={
                  touched.emailOrUsername && Boolean(errors.emailOrUsername)
                }
                {...field}
              />
            )}
          </Field>
          <Field name="password">
            {({
              field,
              form: { touched, errors },
            }: {
              field: any;
              form: any;
            }) => (
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                type="password"
                {...field}
              />
            )}
          </Field>
          <LoginButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
