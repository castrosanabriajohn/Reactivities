import React from "react";
import { useStore } from "../../app/stores/store";
import { Container, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const ServerError = () => {
  const { commonStore } = useStore();
  const { error } = commonStore;
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={error?.message} />
      {error?.stackTrace && (
        <Segment>
          <Header as="h4" content="Stack trace" color="teal" />
          <code style={{ marginTop: "10px" }}>{error?.stackTrace}</code>
        </Segment>
      )}
    </Container>
  );
};
export default observer(ServerError);
