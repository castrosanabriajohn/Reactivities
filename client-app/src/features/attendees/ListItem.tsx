import React from "react";
import { Image, List } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface Props {
  attendees: Profile[];
}

const Listitem = ({ attendees }: Props) => {
  return (
    <List horizontal>
      {attendees.map((a) => (
        <List.Item key={a.username} as={Link} to={`/profiles/${a.username}`}>
          <Image size="mini" circular src={a.image || "/assets/user.png"} />
        </List.Item>
      ))}
    </List>
  );
};

export default observer(Listitem);
