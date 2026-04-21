import test from "node:test";
import assert from "node:assert/strict";

import { generatePopupHTML } from "./popup-html.ts";

test("generatePopupHTML escapes unsafe title and content", () => {
  const html = generatePopupHTML({
    title: '<script>alert("x")</script>',
    content: '<img src=x onerror=alert(1)>',
    color: "#ff0000",
    style: "modern",
    width: 150,
    height: 60,
  });

  assert.ok(html.includes("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"));
  assert.ok(html.includes("&lt;img src=x onerror=alert(1)&gt;"));
  assert.ok(!html.includes("<script>alert("));
});

test("generatePopupHTML supports every configured window style", () => {
  const styles = ["win95", "macos", "tkinter", "modern", "linux"] as const;

  for (const style of styles) {
    const html = generatePopupHTML({
      title: "Hello",
      content: "World",
      color: "#00ff00",
      style,
      width: 150,
      height: 60,
    });

    assert.ok(html.includes("<!DOCTYPE html>"));
    assert.ok(html.includes("window.close()"));
  }
});
