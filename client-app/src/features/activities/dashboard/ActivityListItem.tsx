import React from "react";
import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";
import ListItem from "../../attendees/ListItem";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelado"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 4 }}
              size="tiny"
              circular
              src="/assets/user.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Admin: {activity.host?.displayName}
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color="violet">
                    Eres administrador(a)
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    Has confirmado tu asistencia
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(activity.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ListItem attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="Ver"
        />
      </Segment>
    </Segment.Group>
  );
};
export default observer(ActivityListItem);
