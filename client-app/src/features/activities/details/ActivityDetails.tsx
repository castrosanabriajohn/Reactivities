import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
export const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { currentActivity, openForm, dropCurrentActivity } = activityStore;
  if (!currentActivity) return null;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${currentActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{currentActivity.title}</Card.Header>
        <Card.Meta>
          <span>{currentActivity.date}</span>
        </Card.Meta>
        <Card.Description>{currentActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(currentActivity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={dropCurrentActivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivityDetails);
