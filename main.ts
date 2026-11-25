// One Star, Written in Sap — entry program (v2).
//
// Writes a single one-line 1-star review, in the voice of a houseplant
// reviewing its human owner, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Gate: UTF-8 text of 1-279 characters, not only whitespace, one line,
// no trailing newline.
//
// Runner: Node 22+ (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review (v2: a genuinely different angle from v1's ice-cube
// watering). The plant's grievance: its owner moved it to the bathroom
// "for the humidity", so it now lives in the dark listening to the
// shower — a plant's-eye complaint about light and being moved, with
// the turn that its "spa" treatment is really solitary confinement.
const ENTRY_LINE: string =
  "One star. He calls this a spa retreat, but I haven't seen the sun since March — I photosynthesize by night-light while he sings in the shower, and the humidity is a lie.";

const MIN_CHARS = 1;
const MAX_CHARS = 279;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-279 characters, anything
  // that is only whitespace, or anything spanning more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (/[\r\n]/.test(ENTRY_LINE)) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  const words: number = ENTRY_LINE.split(/\s+/).filter(Boolean).length;
  console.log(`wrote ${length} characters (${words} words) to ${outPath}`);
}

main();
