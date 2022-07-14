import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        We've ran into an issue trying to find the content of the search
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
