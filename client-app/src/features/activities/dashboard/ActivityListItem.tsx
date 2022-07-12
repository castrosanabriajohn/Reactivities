import React, { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Item, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = useStore();
  const { isLoadingFlag, deleteActivity } = activityStore;
  const [target, setTarget] = useState("");
  function handleDeletion(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as="a">{activity.title}</Item.Header>
        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            {activity.city}, {activity.venue}
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="View"
            color="blue"
          />
          <Button
            name={activity.id}
            floated="right"
            content="Delete"
            color="red"
            loading={isLoadingFlag && target === activity.id}
            onClick={(e) => handleDeletion(e, activity.id)}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
export default observer(ActivityListItem);
