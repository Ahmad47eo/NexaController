import test from "node:test";
import assert from "node:assert/strict";
import { ControllerCore } from "../src/core.js";

test("press and release track a button", () => {
  const core = new ControllerCore();
  core.press("cross", "touch");
  assert.equal(core.isPressed("cross"), true);
  core.release("cross", "touch");
  assert.equal(core.isPressed("cross"), false);
});

test("several buttons can be held at once", () => {
  const core = new ControllerCore();
  core.press("cross", "touch");
  core.press("left", "keyboard");
  assert.deepEqual(core.snapshot().buttons, ["cross", "left"]);
});

test("button remains pressed until all sources release it", () => {
  const core = new ControllerCore();
  core.press("cross", "touch");
  core.press("cross", "keyboard");
  core.release("cross", "touch");
  assert.equal(core.isPressed("cross"), true);
  core.release("cross", "keyboard");
  assert.equal(core.isPressed("cross"), false);
});

test("releaseAll can clear one source or every source", () => {
  const core = new ControllerCore();
  core.press("cross", "touch");
  core.press("circle", "keyboard");
  core.releaseAll("touch");
  assert.deepEqual(core.snapshot().buttons, ["circle"]);
  core.releaseAll();
  assert.deepEqual(core.snapshot().buttons, []);
});

test("unknown stick names are rejected", () => {
  const core = new ControllerCore();
  assert.throws(() => core.setStick("middle", 0, 0), RangeError);
});

test("stick values are clamped and diagonal magnitude is normalized", () => {
  const core = new ControllerCore();
  assert.deepEqual(core.setStick("left", 5, 0), { x: 1, y: 0 });
  const diagonal = core.setStick("right", 1, 1, 0);
  assert.ok(Math.abs(Math.hypot(diagonal.x, diagonal.y) - 1) < 1e-12);
});

test("stick deadzone centers small movements", () => {
  const core = new ControllerCore();
  assert.deepEqual(core.setStick("left", 0.05, -0.05, 0.12), { x: 0, y: 0 });
});

test("stick supports negative and centered values", () => {
  const core = new ControllerCore();
  assert.deepEqual(core.setStick("left", -0.8, 0, 0), { x: -0.8, y: 0 });
  assert.deepEqual(core.setStick("left", 0, 0, 0), { x: 0, y: 0 });
});

test("invalid stick values are rejected", () => {
  const core = new ControllerCore();
  assert.throws(() => core.setStick("left", Number.NaN, 0), TypeError);
  assert.throws(() => core.setStick("left", 0, 0, 1), RangeError);
});
