import React from "react";
import { observer } from "mobx-react-lite";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const ActivityFilter = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 34 }}>
        <Header icon="filter" attached color="teal" content="Filtrar" />
        <Menu.Item content="Todas las Actividades" />
        <Menu.Item content="Voy a Ir" />
        <Menu.Item content="Soy Anfitrión" />
      </Menu>
      <Calendar />
    </>
  );
};
export default observer(ActivityFilter);
