import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuthContext } from "../hooks/use-auth.hook";
import PropType from "prop-types";

const FilterByBranchModal = (props) => {
  const auth = useAuthContext();
  const { owner, repo, onGetPullRequestsClick, fullRepoName } = props;
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(undefined);
  const [keywords, setKeywords] = useState(undefined);

  useEffect(() => {
    const getBranches = async () => {
      const result = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/branches?page=1&per_page=100`,
        {
          headers: {
            Authorization: `token ${auth.authToken}`,
          },
        }
      );
      console.log(result.data);
      setBranches(result.data);
    };

    if (auth.authToken && owner && repo) {
      getBranches();
    }
  }, [owner, repo]);

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Branch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select
            size="lg"
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="all">All</option>
            {branches.map((branch) => {
              return (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              );
            })}
          </Form.Select>
          <hr />
          <Form.Group>
            <Form.Label>Not Listed? Enter the name below</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="enter name of branch"
              onChange={(e) => setSelectedBranch(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Form.Group>
            <Form.Label>Enter one or more keywords</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="enter keywords"
              onChange={(e) => setKeywords(e.target.value)}
            />
            <span style={{fontStyle: "italic", fontSize: "smaller"}}>keywords make search results more tailored.</span>
          </Form.Group>          
          <hr />
          <Button variant="success" onClick={() => onGetPullRequestsClick(selectedBranch, fullRepoName, keywords )}>Get Pull Requests</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

FilterByBranchModal.propTypes = {
  owner: PropType.string.isRequired,
  fullRepoName: PropType.string.isRequired,
  repo: PropType.string.isRequired,
  show: PropType.bool.isRequired,
  onHide: PropType.func.isRequired,
  onGetPullRequestsClick: PropType.func.isRequired,
};
export default FilterByBranchModal;
