import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../../app/models/profile";
import ProfileCard from "../profiles/ProfileCard";
import { Image, List, Popup } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface Props {
  attendees: Profile[];
}

const Listitem = ({ attendees }: Props) => {
  return (
    <List horizontal>
      {attendees.map((a) => (
        <Popup
          hoverable
          key={a.userName}
          trigger={
            <List.Item
              key={a.userName}
              as={Link}
              to={`/profiles/${a.userName}`}
            >
              <Image size="mini" circular src={a.image || "/assets/user.png"} />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={a} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default observer(Listitem);
