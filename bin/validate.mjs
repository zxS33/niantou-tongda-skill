#!/usr/bin/env node

import { runValidation } from "./lib/validate.mjs";

const result = await runValidation();
process.exitCode = result.ok ? 0 : 1;
