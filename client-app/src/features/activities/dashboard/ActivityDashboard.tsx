import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilter from "./ActivityFilter";

const ActivityDashboard = () => {
  const {
    activityStore: { loadActivityList, activityRegistry, initialLoadingState },
  } = useStore();
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivityList();
  }, [activityRegistry.size, loadActivityList]);
  if (initialLoadingState) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
