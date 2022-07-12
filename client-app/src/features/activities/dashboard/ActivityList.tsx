import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { activitiesGrouped } = activityStore;

  return (
    <>
      {activitiesGrouped.map(([group, array]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          <Segment>
            <Item.Group>
              {array.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
};
export default observer(ActivityList);
