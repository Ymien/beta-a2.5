import test from "node:test";
import assert from "node:assert/strict";

import { normalizePostSlug } from "./post-slug.ts";

test("normalizePostSlug accepts plain and encoded slugs", () => {
  assert.equal(normalizePostSlug("react-server-components"), "react-server-components");
  assert.equal(normalizePostSlug("cyberpunk-ui-tailwind.md"), "cyberpunk-ui-tailwind");
  assert.equal(normalizePostSlug("blog%2Freact-server-components"), "react-server-components");
});

test("normalizePostSlug rejects empty or unsafe values", () => {
  assert.equal(normalizePostSlug(""), null);
  assert.equal(normalizePostSlug("../secrets"), null);
  assert.equal(normalizePostSlug("nested/path/../post"), null);
  assert.equal(normalizePostSlug("bad slug"), null);
  assert.equal(normalizePostSlug("中文"), null);
});
