import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { ActivityDetails } from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { currentActivity, formFlag } = activityStore;
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
        {currentActivity && !formFlag && <ActivityDetails />}
        {formFlag && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);
