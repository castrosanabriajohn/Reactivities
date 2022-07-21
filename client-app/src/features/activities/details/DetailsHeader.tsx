import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../app/models/activity";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}
const DetailsHeader = ({ activity }: Props) => {
  const {
    activityStore: { updateAttendance, isLoadingFlag, cancelActivityToggle },
  } = useStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelado"
          />
        )}
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date!, "dd MMM yyyy")}</p>
                <p>
                  Administrador:{" "}
                  <strong>
                    <Link to={`/profiles/${activity.host?.userName}`}>
                      {activity.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              color={activity.isCancelled ? "green" : "google plus"}
              floated="left"
              content={activity.isCancelled ? "Re-activar" : "Cancelar"}
              onClick={cancelActivityToggle}
              loading={isLoadingFlag}
            />
            <Button
              as={Link}
              to={`/manage/${activity.id}`}
              disabled={activity.isCancelled}
              color="linkedin"
              floated="right"
            >
              Administrar Evento
            </Button>
          </>
        ) : activity.isGoing ? (
          <Button
            onClick={updateAttendance}
            loading={isLoadingFlag}
            color="google plus"
          >
            Cancelar Asistencia
          </Button>
        ) : (
          <Button
            onClick={updateAttendance}
            disabled={activity.isCancelled}
            loading={isLoadingFlag}
            color="instagram"
          >
            Confirmar Asistencia
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(DetailsHeader);
