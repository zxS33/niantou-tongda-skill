import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { cp, mkdtemp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { runValidation } from "../bin/lib/validate.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function captureStream() {
  let output = "";
  return {
    stream: {
      write(chunk) {
        output += String(chunk);
      },
    },
    output() {
      return output;
    },
  };
}

test("validate succeeds in source checkout", async () => {
  const stdout = captureStream();
  const stderr = captureStream();
  const result = await runValidation({ repoRoot, stdout: stdout.stream, stderr: stderr.stream });
  assert.equal(result.ok, true, stderr.output());
});

test("validate succeeds in a package-like copy", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "niantou-tongda-pkg-"));
  const packageRoot = path.join(tempRoot, "package");
  const stdout = captureStream();
  const stderr = captureStream();

  try {
    await cp(repoRoot, packageRoot, {
      recursive: true,
      filter(source) {
        const relative = path.relative(repoRoot, source);
        return !relative.startsWith(".git")
          && !relative.includes(`${path.sep}node_modules${path.sep}`);
      },
    });

    const result = await runValidation({ repoRoot: packageRoot, stdout: stdout.stream, stderr: stderr.stream });
    assert.equal(result.ok, true, stderr.output());
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
