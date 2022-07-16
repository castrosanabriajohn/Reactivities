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
          NovaActivities
        </Header>
        {isLoggedIn ? (
          <>
            <Header
              as="h2"
              inverted
              content="Welcome to the activities application"
            />
            <Button as={Link} to="/activities" size="huge">
              Go to dashboard
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => openModal(<LoginForm />)} size="huge">
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size="huge">
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};
export default observer(HomePage);
