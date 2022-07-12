import React, { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { isLoadingFlag, activitiesByDate, deleteActivity } = activityStore;
  const [target, setTarget] = useState("");
  function handleDeletion(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group>
        {activitiesByDate.map((activity) => (
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
                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
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
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);
