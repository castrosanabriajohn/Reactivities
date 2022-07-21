import React from "react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

const NavBar = () => {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src="assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          NovaActividades
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Agenda de Actividades" />
        <Menu.Item as={NavLink} to="/errors" name="Pruebas de Errores" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Agendar Actividades"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image src={user?.image || "assets/user.png"} avatar spaced="right" />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.userName}`}
                text="Ir a mi Perfíl"
                icon="user"
              />
              <Dropdown.Item
                onClick={logout}
                text="Cerrar la Sesión"
                icon="power"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
