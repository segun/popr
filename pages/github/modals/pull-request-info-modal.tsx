import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useAuthContext } from "../hooks/use-auth.hook";
import PropType from "prop-types";

const PullRequestInfoModal = (props) => {
  const { pr } = props;
  const auth = useAuthContext();

  return (
    <Modal show={props.show} onHide={props.onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pull Request Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={2}>Title:</Col>
          <Col>{pr.title}</Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2}>Created On:</Col>
          <Col>{pr.created_at}</Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2}>Merged On:</Col>
          <Col>{pr.closed_at}</Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2}>Body:</Col>
          <Col>{pr.body}</Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2}>Url</Col>
          <Col>
            <a href={pr.html_url} target="_blank">
              {pr.html_url}
            </a>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={2}></Col>
          <Col>
            <Button variant="success">
              Mint NFT
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

PullRequestInfoModal.propTypes = {
  pr: PropType.object.isRequired,
  show: PropType.bool.isRequired,
  onHide: PropType.func.isRequired,
};
export default PullRequestInfoModal;
