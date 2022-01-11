import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropType from "prop-types";

const PullRequestsComponent = (props) => {
  const { pullRequests } = props;
  return (
    <div>
      <Row>
        <Col xs={12}>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={3} style={{ fontWeight: "bold" }}>
              Title
            </Col>
            <Col xs={3} style={{ fontWeight: "bold" }}>
              Created On
            </Col>
            <Col xs={3} style={{ fontWeight: "bold" }}>
              Merged On
            </Col>
            <Col xs={3}></Col>
          </Row>

          {pullRequests.map((pr) => {
            return (
              <Row key={pr.id} style={{ marginBottom: "10px" }}>
                <Col xs={3}>{pr.title}</Col>
                <Col xs={3}>{pr.created_at}</Col>
                <Col xs={3}>{pr.closed_at}</Col>
                <Col xs={3}>
                  <Button
                    variant="info"
                  >
                    More Info...
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

PullRequestsComponent.propTypes = {
  pullRequests: PropType.array.isRequired,
};

export default PullRequestsComponent;
