import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import DetailsHeader from "./DetailsHeader";
import DetailsInfo from "./DetailsInfo";
import DetailsChat from "./DetailsChat";
import DetailsSidebar from "./DetailsSidebar";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { currentActivity, loadSingleActivity, initialLoadingState } =
    activityStore;
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) loadSingleActivity(id);
  }, [id, loadSingleActivity]);
  if (initialLoadingState || !currentActivity) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <DetailsHeader activity={currentActivity} />
        <DetailsInfo activity={currentActivity} />
        <DetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <DetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDetails);
