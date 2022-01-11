import { Modal, Button, Row, Col } from "react-bootstrap";
import { useAuthContext } from "../hooks/use-auth.hook";
import PropType from "prop-types";
import p5Types from "p5";
import dynamic from "next/dynamic";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const PullRequestInfoModal = (props) => {
  const { pr } = props;

  const id = () => {
    console.log("PR in ID: ", pr);
    const result = [];
    let val1 = [...pr.html_url.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 1

    val1 = [...pr.node_id.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 2

    val1 = [...pr.title.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 3

    val1 = [...pr.id.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 4

    val1 = [...pr.number.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 5

    val1 = [...pr.created_at.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 6

    val1 = [...pr.updated_at.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 7

    val1 = [...pr.closed_at.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 8

    val1 = [...pr.body.toString()];
    result.push(
      val1.reduce((acc, item) => acc + item.charCodeAt(0), val1.length) % 255
    ); // 9

    // use brighter colors
    const ids = result.map((res) => {
      if (res * 2 > 255) return res;
      if (res * 2 < 255) return res * 2;
      if (res < 130) return res + 100;
      return res;
    });

    return ids;
  };

  const auth = useAuthContext();

  const MAX_HEIGHT = 300;
  const MAX_WIDTH = 300;
  const DENSITY = 16;
  const GAP = MAX_HEIGHT / DENSITY;
  const RELOAD_TIMEOUT = 3000;
  const STROKE_COLOR = "#00203F";

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(MAX_HEIGHT, MAX_WIDTH).parent(canvasParentRef);
    p5.stroke(STROKE_COLOR);
    p5.noLoop();
  };

  function draw(p5: p5Types) {
    let index = id();
    const tonesArray = [];
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    index = id();
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    index = id();
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    index = id();
    tonesArray.push([
      [index[0], index[1], index[2]],
      [index[3], index[4], index[5]],
      [index[6], index[7], index[8]],
    ]);

    console.log(tonesArray);

    const lines = [];
    let odd = false;
    for (let y = GAP / 2; y <= MAX_HEIGHT; y += GAP) {
      odd = !odd;
      const trait = [];
      const oddFactor = odd ? GAP / 2 : 0;
      for (let x = GAP / 4; x <= MAX_HEIGHT; x += GAP) {
        trait.push({
          x: x + (Math.random() * 0.8 - 0.4) * GAP + oddFactor,
          y: y + (Math.random() * 0.8 - 0.4) * GAP,
        });
      }
      lines.push(trait);
    }
    odd = true;
    for (let y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      const dotLine = [];
      for (let i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
      }
      for (let i = 0; i < dotLine.length - 2; i++) {
        let tonesIndex = Math.floor(Math.random() * tonesArray.length);
        let tones = tonesArray[tonesIndex];

        drawTriangle(p5, dotLine[i], dotLine[i + 1], dotLine[i + 2], tones);
      }
    }
  }

  const drawTriangle = (p5: p5Types, pointA, pointB, pointC, tones) => {
    let random_index = Math.floor(Math.random() * tones.length);
    const [r, g, b] = tones[random_index];
    p5.fill(r, g, b);
    p5.triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
  };

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
          <Col xs={2}>
            <Button variant="success">Mint NFT</Button>
          </Col>
          <Col>
            <Sketch setup={setup} draw={draw} />
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
