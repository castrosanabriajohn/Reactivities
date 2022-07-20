import React from "react";
import { observer } from "mobx-react-lite";
import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Profile } from "../../../app/models/profile";

interface Props {
  attendees: Profile[];
}

const DetailsSidebar = ({ attendees }: Props) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        <strong>
          {attendees.length} {attendees.length === 1 ? "Persona" : "Personas"}{" "}
        </strong>
        han confirmado
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((a) => (
            <Item style={{ position: "relative" }} key={a.username}>
              <Label
                style={{ position: "absolute" }}
                color="violet"
                ribbon="right"
              >
                Anfitrión
              </Label>
              <Image size="tiny" src={a.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${a.username}`}>{a.displayName}</Link>
                </Item.Header>
                <Item.Extra style={{ color: "orange" }}>Siguiendo</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
};
export default observer(DetailsSidebar);
