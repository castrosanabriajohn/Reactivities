import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.activitiesRequests.list().then((response) => {
      let _activities: Activity[] = [];
      response.forEach((_activity) => {
        _activity.date = _activity.date.split("T")[0];
        _activities.push(_activity);
      });
      setActivities(_activities);
      setLoading(false);
    });
  }, []);
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleOpenForm(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleCloseForm() {
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
  }
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((a) => a.id !== id)]);
  }
  if (loading) return <LoadingComponent />;
  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
