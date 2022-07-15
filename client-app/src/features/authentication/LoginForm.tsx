import React from "react";
import { Form, Formik } from "formik";
import TextInput from "../activities/form/TextInput";
import { Button } from "semantic-ui-react";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <Button positive content="Login" fluid />
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
