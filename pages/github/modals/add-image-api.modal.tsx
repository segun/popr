import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface DialogProps {
  open: boolean;
  buttonDisabled: boolean;
  setOpen: (value: boolean) => void;
  onHide: () => void;
  addNewImageApi: (name, url) => void;
}

const AddImageApiDialog = (props: DialogProps) => {
  const [apiName, setApiName] = useState("");
  const [apiUrl, setApiUrl] = useState("");  

  return (
    <Modal show={props.open} onHide={props.onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Image Api
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Enter name of API</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="enter name of api"
              onChange={(e) => setApiName(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Form.Group>
            <Form.Label>Enter API endpoint URL</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="enter API endpoint URL"
              onChange={(e) => setApiUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Label style={{ fontSize: "10px" }}>
            A get request will be send to this URL and a 200 status is expected
            with a body that says {"{'status':'ok'}"}
          </Form.Label>
        </Form>
        <hr />
        <Button
          disabled={props.buttonDisabled}
          variant="success"
          onClick={() => 
            props.addNewImageApi(apiName, apiUrl)
          }
        >
          Add
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setOpen(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddImageApiDialog;
