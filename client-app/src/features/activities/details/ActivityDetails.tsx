import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useParams, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { currentActivity, loadSingleActivity, initialLoadingState } = activityStore;
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) loadSingleActivity(id);
  }, [id, loadSingleActivity])
  if (initialLoadingState || !currentActivity) return <LoadingComponent />;
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
            as={Link}
            to={`/manage/${currentActivity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to="/activities"
            basic
            color="grey"
            content="Cancel"
            onClick={() => null}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivityDetails);
