import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync(process.execPath, [join(root, "scripts", "build.mjs")], { stdio: "pipe" });

const css = readFileSync(join(root, "dist", "tokens.css"), "utf8");
const semantic = JSON.parse(readFileSync(join(root, "src", "color.semantic.json"), "utf8"));
const varName = (key) => `--color-${key.replace(/\./g, "-").toLowerCase()}`;

test("every semantic token is defined for light, dark and the OS dark fallback", () => {
  for (const key of Object.keys(semantic)) {
    const matches = css.split(`${varName(key)}:`).length - 1;
    assert.equal(matches, 3, `${varName(key)} should appear in light, dark and the media query`);
  }
});

test("semantic tokens reference primitives, never raw hex", () => {
  const semanticSection = css.slice(css.indexOf(':root,\n[data-theme="light"]'));
  assert.ok(!/#[0-9a-f]{6}/i.test(semanticSection), "found a raw hex colour in the semantic section");
});

test("the dark theme actually differs from light", () => {
  assert.notEqual(semantic["background.neutral.primary"].light, semantic["background.neutral.primary"].dark);
});

test("sizing and typography variables are emitted", () => {
  for (const name of ["--size-2xl", "--size-2xs", "--font-family-body", "--font-weight-500", "--font-size-paragraph-body"]) {
    assert.ok(css.includes(`${name}:`), `${name} missing`);
  }
});
