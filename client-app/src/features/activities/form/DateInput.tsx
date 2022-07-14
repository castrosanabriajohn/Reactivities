import React from "react";
import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Form } from "semantic-ui-react";

const DateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />
    </Form.Field>
  );
};

export default DateInput;
