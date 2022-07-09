import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    currentActivity,
    toggleFormFlag,
    createActivity,
    updateActivity,
    isLoadingFlag,
  } = activityStore;
  const initialState = currentActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [formActivity, setFormActivity] = useState(initialState);

  const handleSubmit = () =>
    formActivity.id
      ? updateActivity(formActivity)
      : createActivity(formActivity);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormActivity({ ...formActivity, [name]: value });
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={formActivity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={formActivity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={formActivity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={formActivity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={formActivity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={formActivity.venue}
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
          onClick={toggleFormFlag}
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);
