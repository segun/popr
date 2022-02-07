import p5Types from "p5";
import { Scene, Triangle, Circle, Group, Rect, Polygon, Star, Rose, Spiral, toRadians, Shape, DrawerCanvas } from '@urpflanze/js'
import { ImageProps, InstalledLibraries } from "./data";

const p5Internal = {
  drawCircle: (p5: p5Types, pointA, pointB, radius) => {
    const [r, g, b] = [0, 0, 0]; 
    // p5.fill(r, g, b);
    p5.circle(pointA.x, pointB.y, radius);
  },

  drawTriangle: (p5: p5Types, pointA, pointB, pointC) => {
    const [r, g, b] = [0, 0, 0]; 
    // p5.fill(r, g, b);
    p5.triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
  },
};

export const genart = {
    setup: (library, params): p5Types.Element | Scene => {
        switch(library) {
            case InstalledLibraries.p5: return libP5.setup(params);
            case InstalledLibraries.Urpflanze: return libUrpflanze.setup();
        }
    },

    draw: (library, params) => {
        switch(library) {
            case InstalledLibraries.p5: return libP5.draw(params);
            case InstalledLibraries.Urpflanze: return libUrpflanze.draw(params);
        }
    }
}

const libUrpflanze = {
    setup: () => {
        return new Scene();
    },

    draw: (params) => {
        const scene = new Scene({
            color: '#000',
            background: '#fff',
            width: ImageProps.width,
            height: ImageProps.height
        });
        
        const triangle = new Triangle();
        const circle = new Circle();
        const rect = new Rect();
        const polygon = new Polygon();
        const star = new Star();
        const rose = new Rose();
        const spiral = new Spiral();

        const shapes = [triangle, circle, rect, polygon, star, rose, spiral];
        const shape1 = shapes[params.pr.id % 7];
        const shape2 = shapes[params.pr.number % 7];
        const shape3 = shapes[params.pr.comments % 7];
        const group = new Group({
            repetitions: (+params.pr.id % 8) + 8,
            // sideLength: 30,
            distance: 120,
            rotateZ: toRadians(45)
        });
        
        group.add(shape1, shape2, shape3);

        const container = new Shape({
            // SceneChild to apply properties and transformations to
            shape: group,
        
            repetitions: (+params.pr.id % 8) + 4,
            distance: 120,
        
            // I scale the past shape so that it fits into the scene
            scale: .28
        });
        
        scene.add(container);

        const drawer = new DrawerCanvas(scene, params.canvasRef);        
        drawer.draw();  
    }
}

const libP5 = {
  setup: (params) => {
    const STROKE_COLOR = "#00203F";
    const c = params.p5
      .createCanvas(ImageProps.height, ImageProps.width)
      .parent(params.canvasParentRef);
    c.id("my-canvas");
    params.p5.stroke(STROKE_COLOR);
    params.p5.noLoop();
    return c;
  },

  draw: (p5: p5Types) => {    
    const lines = [];
    let odd = false;
    const GAP =
      ImageProps.height / (Math.floor(Math.random() * 32) + ImageProps.density);

    for (let y = GAP / 2; y <= ImageProps.height; y += GAP) {
      odd = !odd;
      const trait = [];
      const oddFactor = odd ? GAP / 2 : 0;
      for (let x = GAP / 4; x <= ImageProps.height; x += GAP) {
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
        let radius = 20;

        if (i % 3 === 0) {
          radius = 15;
        }

        if (i % 2 === 0) {
          p5Internal.drawTriangle(
            p5,
            dotLine[i],
            dotLine[i + 1],
            dotLine[i + 2]
          );
        } else {
          p5Internal.drawCircle(p5, dotLine[i + 2], dotLine[i + 1], radius);
        }
      }
    }
  },
};
