import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import TextInput from "../activities/form/TextInput";
import * as Yup from "yup";

const RegisterForm = () => {
  const {
    userStore: { register },
  } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        register(values).catch(
          (error) => setErrors({ error: "Invalid email or password" }) // In case an error occurs in the catch block sets the error
        )
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Registrese a NovaActividades"
            color="teal"
            textAlign="center"
          />
          <TextInput name="displayName" placeholder="Nombre a mostrar" />
          <TextInput name="username" placeholder="Nombre de usuario" />
          <TextInput name="email" placeholder="Correo electrónico" />
          <TextInput name="password" placeholder="Contraseña" />
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
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Registrese a NovaActividades"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
