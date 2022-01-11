import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropType from "prop-types";
import PullRequestInfoModal from "../modals/pull-request-info-modal";

const PullRequestsComponent = (props) => {
  const [showPRInfoModal, setShowPRInfoModal] = useState(false);
  const [selectedPR, setSelectedPR] = useState({});

  const { pullRequests } = props;

  const showPRInfo = (pr) => {
    console.log(pr);
    setSelectedPR(pr);
    setShowPRInfoModal(true);
  };

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
                  <Button variant="info" onClick={() => showPRInfo(pr)}>
                    More Info...
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
      <PullRequestInfoModal
        pr={selectedPR}
        show={showPRInfoModal}
        onHide={() => setShowPRInfoModal(false)}
      />
    </div>
  );
};

PullRequestsComponent.propTypes = {
  pullRequests: PropType.array.isRequired,
};

export default PullRequestsComponent;
