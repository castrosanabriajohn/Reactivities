import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../../app/models/profile";
import { Card, Icon, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
}

const ProfileCard = ({ profile }: Props) => {
  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || "assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>Biografía</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        20 seguidores
      </Card.Content>
    </Card>
  );
};

export default observer(ProfileCard);
