import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header } from "semantic-ui-react";
import TextInput from "../activities/form/TextInput";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

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
          (error) => setErrors({ error }) // In case an error occurs in the catch block sets the error
        )
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required("Nombre a mostrar es requerido"),
        username: Yup.string().required("El nombre de usuario es requerido"),
        email: Yup.string()
          .required("Un correo electrónico válido es requerido")
          .email(),
        password: Yup.string().required("Una contraseña válida es requerida"),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Regístrese a NovaActividades"
            color="teal"
            textAlign="center"
          />
          <TextInput name="displayName" placeholder="Nombre a mostrar" />
          <TextInput name="username" placeholder="Nombre de usuario" />
          <TextInput name="email" placeholder="Correo electrónico" />
          <TextInput name="password" placeholder="Contraseña" />
          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Regístrese a NovaActividades"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
