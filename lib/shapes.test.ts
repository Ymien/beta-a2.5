import test from "node:test";
import assert from "node:assert/strict";

import { normalizeShape, parseShape, scaleToStage } from "./shapes.ts";

test("parseShape extracts filled coordinates", () => {
  assert.deepEqual(parseShape(["#.", ".#"]), [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);
});

test("normalizeShape recenters coordinates around origin", () => {
  const normalized = normalizeShape([
    { x: 2, y: 2 },
    { x: 4, y: 2 },
    { x: 4, y: 4 },
  ]);

  const avgX = normalized.reduce((sum, point) => sum + point.x, 0) / normalized.length;
  const avgY = normalized.reduce((sum, point) => sum + point.y, 0) / normalized.length;

  assert.ok(Math.abs(avgX) < 1e-9);
  assert.ok(Math.abs(avgY) < 1e-9);
});

test("scaleToStage keeps windows inside stage bounds", () => {
  const scaled = scaleToStage(
    [
      { x: -1, y: -1 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ],
    1200,
    800,
    150,
    60,
    40
  );

  assert.ok(scaled.every((point) => point.x >= 0));
  assert.ok(scaled.every((point) => point.y >= 0));
  assert.ok(scaled.every((point) => point.x <= 1050));
  assert.ok(scaled.every((point) => point.y <= 740));
});
