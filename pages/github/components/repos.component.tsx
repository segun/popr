import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const RepositoriesComponent = (props) => {
  const { userRepos, onPullRequestsClick } = props;

  return (
    <div>
      <Row>
        <Col xs={12}>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={3} style={{ fontWeight: "bold" }}>Name</Col>
            <Col xs={3} style={{ fontWeight: "bold" }}>Owner</Col>
            <Col xs={3} style={{ fontWeight: "bold" }}>Url</Col>
            <Col xs={3}></Col>
          </Row>
          {userRepos.map((repo) => {
            return (
              <Row key={repo.full_name} style={{ marginBottom: "10px" }}>
                <Col xs={3}>{repo.name}</Col>
                <Col xs={3}>{repo.owner.login}</Col>
                <Col xs={3}>{repo.html_url}</Col>
                <Col xs={3}>
                  <Button
                    onClick={() => onPullRequestsClick(repo.name, repo.full_name, repo.owner.login)}
                    variant="info"
                  >
                    Pull Requests
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

RepositoriesComponent.propTypes = {
  userRepos: PropTypes.array.isRequired,
  onPullRequestsClick: PropTypes.func.isRequired,
};

export default RepositoriesComponent;
