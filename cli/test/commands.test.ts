import { describe, expect, it } from "vitest";
import { buildProgram } from "../src/index.js";

describe("pulse command list", () => {
  it("registers every command from the build plan", () => {
    const names = buildProgram().commands.map((c) => c.name()).sort();
    expect(names).toEqual(["analyze", "csv", "export", "report", "run", "servers", "setup", "xlsx"]);
  });

  it("every server command has date-range flags except servers and setup", () => {
    for (const cmd of buildProgram().commands) {
      const flags = cmd.options.map((o) => o.long);
      if (["servers", "setup"].includes(cmd.name())) {
        expect(flags).not.toContain("--days");
      } else {
        expect(flags).toEqual(expect.arrayContaining(["--server", "--days", "--from", "--to"]));
      }
    }
  });
});
