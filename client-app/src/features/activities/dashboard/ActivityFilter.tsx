import React from "react";
import { observer } from "mobx-react-lite";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const ActivityFilter = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 34 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Calendar />
    </>
  );
};
export default observer(ActivityFilter);
