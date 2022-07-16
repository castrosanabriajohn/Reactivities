import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export const HomePage = () => {
  const {
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
          Activities
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
          <Button as={Link} to="/login" size="huge">
            Login
          </Button>
        )}
      </Container>
    </Segment>
  );
};
export default observer(HomePage);
