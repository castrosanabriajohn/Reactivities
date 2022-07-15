import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { observer } from "mobx-react-lite";
import TextArea from "./TextArea";
import DropdownInput from "./DropdownInput";
import { categoryOptions } from "./categoryOptions";
import DateInput from "./DateInput";
import { Activity } from "../../../app/models/activity";
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
  const [formActivity, setFormActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    category: Yup.string().required(),
    description: Yup.string().required(),
    date: Yup.string().required("date is a required field").nullable(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadSingleActivity(id).then((actitivity) => setFormActivity(actitivity!));
  }, [id, loadSingleActivity]); // as long as the dependencies don't change will only execute once

  const handleFormSubmit = (formActivity: Activity) => {
    if (formActivity.id.length === 0) {
      let newActivity = { ...formActivity, id: uuid() };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(formActivity).then(() =>
        history.push(`/activities/${formActivity.id}`)
      );
    }
  };
  if (initialLoadingState)
    return <LoadingComponent content="Loading form..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={formActivity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="title" placeholder="Title" />
            <TextArea placeholder="Description" name="description" rows={3} />
            <DropdownInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" color="teal" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
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
