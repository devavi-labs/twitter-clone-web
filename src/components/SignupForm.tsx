import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, makeStyles, TextField, Typography } from "@material-ui/core";
import { SignupButton } from ".";

type SignupValues = {
  displayName: string;
  username: string;
  email: string;
  password: string;
};

const initialValues: SignupValues = {
  displayName: "",
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  displayName: Yup.string().min(3).required().label("Display name"),
  username: Yup.string()
    .min(3)
    .matches(/^(?!.*[-/:-@[-`{-~])/, {
      message: "Username must not contain any special characters like @",
    })
    .required()
    .label("Username"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(6).required().label("Password"),
});

export const SignupForm: React.FC = () => {
  const useStyles = makeStyles(({ palette }) => ({
    paragraph: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      opacity: palette.type === "dark" ? 0.8 : 1,
    },
  }));
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Field name="displayName">
            {({
              field,
              form: { touched, errors },
            }: {
              field: any;
              form: any;
            }) => (
              <TextField
                label="Display Name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                helperText={touched.displayName ? errors.displayName : ""}
                error={touched.displayName && Boolean(errors.displayName)}
                {...field}
              />
            )}
          </Field>
          <Field name="username">
            {({
              field,
              form: { touched, errors },
            }: {
              field: any;
              form: any;
            }) => (
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                helperText={touched.username ? errors.username : ""}
                error={touched.username && Boolean(errors.username)}
                {...field}
              />
            )}
          </Field>
          <Field name="email">
            {({
              field,
              form: { touched, errors },
            }: {
              field: any;
              form: any;
            }) => (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
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
          <Typography paragraph className={classes.paragraph}>
            By signing up, you agree to the <Link>Terms of Service</Link> and{" "}
            <Link>Privacy Policy</Link>, including <Link>Cookie Use</Link>.
            Others will be able to find you by email when provided ·{" "}
            <Link>Privacy Options</Link>
          </Typography>
          <SignupButton type="submit" />
        </Form>
      )}
    </Formik>
  );
};
