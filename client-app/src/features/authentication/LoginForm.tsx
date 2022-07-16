import React from "react";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../activities/form/TextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const { userStore } = useStore();
  const { login } = userStore;
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch(
          (error) => setErrors({ error: "Invalid email or password" }) // In case an error occurs in the catch block sets the error
        )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to NovaActivities"
            color="teal"
            textAlign="center"
          />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                content={errors.error}
                style={{ marginBottom: 10 }}
                basic
                color="red"
              />
            )}
          />
          <Button loading={isSubmitting} positive content="Login" fluid />
        </Form>
      )}
    </Formik>
  );
};
export default observer(LoginForm);
