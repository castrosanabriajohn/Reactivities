import React from "react";
import { observer } from "mobx-react-lite";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";

const DetailsChat = () => {
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chatea sobre este evento</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Mateo Zamora</Comment.Author>
              <Comment.Metadata>
                <div>Hoy a las 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>Muy artistico!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Responder</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Joel Hernandez</Comment.Author>
              <Comment.Metadata>
                <div>Hace 5 días</div>
              </Comment.Metadata>
              <Comment.Text>Que genial, yo me apunto!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Responder</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea />
            <Button
              content="Agregar Respuesta"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </>
  );
};

export default observer(DetailsChat);
