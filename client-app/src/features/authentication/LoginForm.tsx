import React from "react";
import { useStore } from "../../app/stores/store";
import { Form, Formik } from "formik";
import TextInput from "../activities/form/TextInput";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const { userStore } = useStore();
  const { login } = userStore;
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => login(values)}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <Button loading={isSubmitting} positive content="Login" fluid />
        </Form>
      )}
    </Formik>
  );
};
export default observer(LoginForm);
