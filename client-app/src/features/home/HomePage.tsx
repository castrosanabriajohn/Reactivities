import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import LoginForm from "../authentication/LoginForm";
import RegisterForm from "../authentication/RegisterForm";

export const HomePage = () => {
  const {
    modalStore: { openModal },
    userStore: { isLoggedIn },
  } = useStore();
  return (
    <Segment inverted textAlign="center" className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          NovaActividades
        </Header>
        {isLoggedIn ? (
          <>
            <Header
              as="h2"
              inverted
              content="Bienvenid@ a la Aplicación de Eventos y Actividades"
            />
            <Button as={Link} to="/activities" size="huge">
              Ir al tablero
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => openModal(<LoginForm />)} size="huge">
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size="huge">
              Registrarme
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};
export default observer(HomePage);
