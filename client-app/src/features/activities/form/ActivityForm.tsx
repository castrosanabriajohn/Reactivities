import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    isLoadingFlag,
    loadSingleActivity,
    initialLoadingState,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [formActivity, setFormActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadSingleActivity(id).then((actitivity) => setFormActivity(actitivity!));
  }, [id, loadSingleActivity]); // as long as the dependencies don't change will only execute once

  const handleSubmit = () => {
    if (formActivity.id.length === 0) {
      let newActivity = { ...formActivity, id: uuid() }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      updateActivity(formActivity).then(() => history.push(`/activities/${formActivity.id}`));
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormActivity({ ...formActivity, [name]: value });
  }
  if (initialLoadingState) return <LoadingComponent content="Loading form..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={formActivity ? formActivity.title : ""}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={formActivity ? formActivity.description : ""}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={formActivity ? formActivity.category : ""}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={formActivity ? formActivity.date : ""}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={formActivity ? formActivity.city : ""}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={formActivity ? formActivity.venue : ""}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          onChange={handleInputChange}
          loading={isLoadingFlag}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => null}
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);
