import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export const ActivityDashboard = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivityList();
  }, [activityStore]);
  if (activityStore.initialLoadingState) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
