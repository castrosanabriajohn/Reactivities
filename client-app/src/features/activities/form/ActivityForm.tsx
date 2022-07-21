import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { categoryOptions } from "./categoryOptions";
import { Button, Header, Segment } from "semantic-ui-react";
import DropdownInput from "./DropdownInput";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import DateInput from "./DateInput";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loadSingleActivity,
    initialLoadingState,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [formActivity, setFormActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );
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
      loadSingleActivity(id).then((actitivity) =>
        setFormActivity(new ActivityFormValues(actitivity))
      );
  }, [id, loadSingleActivity]); // as long as the dependencies don't change will only execute once

  const handleFormSubmit = (formActivity: ActivityFormValues) => {
    if (!formActivity.id) {
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
  if (initialLoadingState) return <LoadingComponent content="Cargando..." />;

  return (
    <Segment clearing>
      <Header content="Detalles de la Actividad" color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={formActivity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="title" placeholder="Título" />
            <TextArea placeholder="Descripción" name="description" rows={3} />
            <DropdownInput
              options={categoryOptions}
              placeholder="Categoría"
              name="category"
            />
            <DateInput
              placeholderText="Fecha"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Detalles de Ubicación" color="teal" />
            <TextInput placeholder="Ciudad" name="city" />
            <TextInput placeholder="Lugar" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              floated="right"
              positive
              type="submit"
              content="Enviar"
              loading={isSubmitting}
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancelar"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
export default observer(ActivityForm);
