import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { observer } from "mobx-react-lite";
import TextArea from "./TextArea";

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

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    category: Yup.string().required(),
    description: Yup.string().required(),
    date: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadSingleActivity(id).then((actitivity) => setFormActivity(actitivity!));
  }, [id, loadSingleActivity]); // as long as the dependencies don't change will only execute once

  /*  const handleSubmit = () => {
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
  } */
  if (initialLoadingState)
    return <LoadingComponent content="Loading form..." />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={formActivity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="title" placeholder="Title" />
            <TextArea placeholder="Description" name="description" rows={3} />
            <TextInput placeholder="Category" name="category" />
            <TextInput placeholder="Date" name="date" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={isLoadingFlag}
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
export default observer(ActivityForm);
