import { AbstractShape } from "../abstractShape";
import { COLOR_BRAND } from "../../constants/colors";
import type { Board } from "../../board";
import type { CircleOptions } from "../shapeFactory";
import type { BoardState } from './../../boardState';

export class Circle extends AbstractShape {
  radius: number;

  get _width() { return this.radius * 2; }
  get _height() { return this.radius * 2; }

  constructor({ state, ctx, options: { id, x, y, fillColor, radius } }: {
    state: BoardState;
    ctx: CanvasRenderingContext2D;
    options: CircleOptions;
  }) {
    super(state, ctx, id, x, y, fillColor);

    this.radius = radius;
  }

  checkHover(pointer: [number, number]): boolean {
    const result =
      Math.sqrt(
        (pointer[0] - this.x - this.radius) ** 2 +
        (pointer[1] - this.y - this.radius) ** 2
      ) <= this.radius;
    this.isHover = result;
    return result;
  }

  draw() {
    this.ctx2d.beginPath();
    this.ctx2d.fillStyle = this.fillColor;
    this.ctx2d.arc(
      (this.x + this.radius - this.boardState.viewportCorner[0]) * this.boardState.scale,
      (this.y + this.radius - this.boardState.viewportCorner[1]) * this.boardState.scale,
      this.radius * this.boardState.scale,
      0,
      Math.PI * 2
    );
    this.ctx2d.fill();
    this.ctx2d.closePath();
  }

  drawHover() {
    this.ctx2d.beginPath();
    this.ctx2d.strokeStyle = COLOR_BRAND;
    this.ctx2d.lineWidth = 3;
    this.ctx2d.arc(
      (this.x + this.radius - this.boardState.viewportCorner[0]) * this.boardState.scale,
      (this.y + this.radius - this.boardState.viewportCorner[1]) * this.boardState.scale,
      this.radius * this.boardState.scale,
      0,
      Math.PI * 2
    );
    this.ctx2d.stroke();
    this.ctx2d.closePath();
  }

  drawSelected() {
    const cornerHalfSize = 5;
    const cornerWidth = cornerHalfSize * 2;
    const cornerHeight = cornerHalfSize * 2;

    this.ctx2d.beginPath();
    this.ctx2d.strokeStyle = COLOR_BRAND;
    this.ctx2d.lineWidth = 2;

    // ----------Corners----------
    // Top Left
    this.ctx2d.rect(
      this.viewLeftX - cornerHalfSize,
      this.viewTopY - cornerHalfSize,
      cornerWidth,
      cornerHeight
    );

    // Top Right
    this.ctx2d.rect(
      this.viewRightX - cornerHalfSize,
      this.viewTopY - cornerHalfSize,
      cornerWidth,
      cornerHeight
    );

    // Bottom Left
    this.ctx2d.rect(
      this.viewLeftX - cornerHalfSize,
      this.viewBottomY - cornerHalfSize,
      cornerWidth,
      cornerHeight
    );

    // Bottom Right
    this.ctx2d.rect(
      this.viewRightX - cornerHalfSize,
      this.viewBottomY - cornerHalfSize,
      cornerWidth,
      cornerHeight
    );

    // ----------Lines----------
    // Top
    this.ctx2d.moveTo(
      this.viewLeftX + cornerHalfSize,
      this.viewTopY
    );
    this.ctx2d.lineTo(
      this.viewRightX - cornerHalfSize,
      this.viewTopY
    );

    // Right
    this.ctx2d.moveTo(
      this.viewRightX,
      this.viewTopY + cornerHalfSize
    );
    this.ctx2d.lineTo(
      this.viewRightX,
      this.viewBottomY - cornerHalfSize
    );

    // Bottom
    this.ctx2d.moveTo(
      this.viewRightX - cornerHalfSize,
      this.viewBottomY
    );
    this.ctx2d.lineTo(
      this.viewLeftX + cornerHalfSize,
      this.viewBottomY
    );

    // Left
    this.ctx2d.moveTo(
      this.viewLeftX,
      this.viewBottomY - cornerHalfSize
    );
    this.ctx2d.lineTo(
      this.viewLeftX,
      this.viewTopY + cornerHalfSize
    );

    this.ctx2d.stroke();
    this.ctx2d.closePath();
  }
}
