import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import axios from "axios";

const TestErrors = () => {
  const baseUrl = "http://localhost:5000/api/"; // configure base URL to connect to API

  // Functions that go to the endpoints of buggy controller to print the error message

  const handleNotFound = () =>
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));

  const handleBadRequest = () =>
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));

  const handleServerError = () =>
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));

  const handleUnauthorised = () =>
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));

  const handleBadGuid = () =>
    axios
      .get(baseUrl + "activities/notaguid")
      .catch((err) => console.log(err.response));

  const handleValidationError = () =>
    axios
      .post(baseUrl + "activities", {})
      .catch((err) => console.log(err.response));

  return (
    <>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths="7">
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button
            onClick={handleBadRequest}
            content="Bad Request"
            basic
            primary
          />
          <Button
            onClick={handleValidationError}
            content="Validation Error"
            basic
            primary
          />
          <Button
            onClick={handleServerError}
            content="Server Error"
            basic
            primary
          />
          <Button
            onClick={handleUnauthorised}
            content="Unauthorized"
            basic
            primary
          />
          <Button onClick={handleBadGuid} content="Bad Guid" basic primary />
        </Button.Group>
      </Segment>
    </>
  );
};
export default TestErrors;
