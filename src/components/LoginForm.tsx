import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import { LoginButton } from ".";

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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
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
          <LoginButton type="submit" variant="contained" />
        </Form>
      )}
    </Formik>
  );
};
