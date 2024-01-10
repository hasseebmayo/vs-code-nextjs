import React, { useEffect, useRef } from "react";

const SpiralMouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let w: number, h: number;
  let v = 0;
  let g: { x?: number; y?: number } = {};
  let circles: Circle[] = [];

  const rgb = [
    [26, 188, 156],
    [46, 204, 113],
    [52, 152, 219],
    [155, 89, 182],
    [241, 196, 15],
    [230, 126, 34],
    [231, 76, 60],
  ];

  class Circle {
    x: number;
    y: number;
    radius: number;
    angle: number;
    speed: number;
    rgb: number[];
    style: string;

    constructor() {
      this.x = g.x || 0;
      this.y = g.y || 0;
      this.radius = 10; // Initial radius, adjust as needed
      this.angle = 0;
      this.speed = getRandomInt(1, 3); // Adjust the speed as needed
      this.rgb = rgb[getRandomInt(0, rgb.length - 1)];
      this.style = `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.5)`;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.radius > 0) {
        // Ensure radius is positive
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    update() {
      this.angle += 0.02; // Adjust the rotation speed as needed
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
      this.radius -= 0.1; // Adjust the size decrease rate as needed
    }
  }

  const resizeReset = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      w = canvas.width = window.innerWidth - 20 || 0;
      h = canvas.height = window.innerHeight || 0;
    }
  };
  const animationLoop = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);
    if (g.x !== undefined && g.y !== undefined) {
      circles.push(new Circle());
    }
    if (circles.length > 200) {
      circles.shift();
    }
    drawCircles(ctx);
    requestAnimationFrame(animationLoop);
  };

  const drawCircles = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < circles.length; i++) {
      circles[i].update();
      circles[i].draw(ctx);
    }
  };

  const mousemove = (e: React.MouseEvent) => {
    g.x = e.clientX;
    g.y = e.clientY;
  };

  const mouseout = () => {
    g.x = undefined;
    g.y = undefined;
  };

  const getRandomInt = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min)) + min;
  };

  // useEffect(() => {
  //   resizeReset();
  //   animationLoop();
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", resizeReset);
  //   return () => {
  //     window.removeEventListener("resize", resizeReset);
  //   };
  // }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{ display: "block" }}
      onMouseMove={mousemove}
      onMouseOut={mouseout}
    ></canvas>
  );
};

export default SpiralMouseTrail;
