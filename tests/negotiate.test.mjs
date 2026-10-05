// Unit tests for Accept negotiation. Run: npm test (Node 22.18+/24 strips TS types natively).
import { test } from "node:test";
import assert from "node:assert/strict";
import { preferredType, appendVaryAccept } from "../src/lib/agent/negotiate.ts";

test("missing or wildcard Accept defaults to HTML", () => {
  assert.equal(preferredType(null), "text/html");
  assert.equal(preferredType(""), "text/html");
  assert.equal(preferredType("*/*"), "text/html");
});

test("browser Accept header gets HTML", () => {
  assert.equal(
    preferredType("text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"),
    "text/html",
  );
});

test("agent Accept header gets Markdown", () => {
  assert.equal(preferredType("text/markdown"), "text/markdown");
  assert.equal(preferredType("text/markdown, text/html;q=0.9"), "text/markdown");
  assert.equal(preferredType("text/markdown, text/html, */*"), "text/markdown");
});

test("q-values are honored", () => {
  assert.equal(preferredType("text/markdown;q=0.5, text/html"), "text/html");
  assert.equal(preferredType("text/html;q=0.5, text/markdown;q=0.8"), "text/markdown");
  assert.equal(preferredType("text/html;q=0, */*"), "text/markdown");
});

test("specific range overrides wildcard even with lower q", () => {
  assert.equal(preferredType("text/*;q=1, text/markdown;q=0"), "text/html");
});

test("unsatisfiable Accept returns null (406)", () => {
  assert.equal(preferredType("application/pdf"), null);
  assert.equal(preferredType("text/markdown;q=0, text/html;q=0"), null);
});

test("appendVaryAccept adds Accept without clobbering", () => {
  const h = new Headers();
  appendVaryAccept(h);
  assert.equal(h.get("Vary"), "Accept");

  const h2 = new Headers({ Vary: "rsc, next-router-state-tree" });
  appendVaryAccept(h2);
  assert.equal(h2.get("Vary"), "rsc, next-router-state-tree, Accept");

  const h3 = new Headers({ Vary: "accept" });
  appendVaryAccept(h3);
  assert.equal(h3.get("Vary"), "accept");
});
