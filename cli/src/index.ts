import { Command } from "commander";
import { withDateRange, withServer } from "./options.js";

const NOT_BUILT = "This command is not built yet. It arrives in a later step of the build plan.";

function notBuilt(name: string) {
  return () => {
    console.log(`pulse ${name}: ${NOT_BUILT}`);
    process.exitCode = 1;
  };
}

export function buildProgram(): Command {
  const program = new Command("pulse")
    .description("Community Pulse: take a pulse of a product community Discord server.")
    .version("0.1.0");

  program
    .command("servers")
    .description("List every server the bot is in and whether it has a profile yet.")
    .action(notBuilt("servers"));

  withServer(program.command("setup"))
    .description("Create or edit the server profile (products, feature areas, staff roles, channels).")
    .action(notBuilt("setup"));

  withDateRange(withServer(program.command("export")))
    .option("--include <channels...>", "only these channels")
    .option("--exclude <channels...>", "skip these channels")
    .description("Save messages to the database.")
    .action(notBuilt("export"));

  withDateRange(withServer(program.command("analyze")))
    .option("--yes", "skip the cost confirmation prompt")
    .description("Tag the exported messages as feedback with Claude.")
    .action(notBuilt("analyze"));

  withDateRange(withServer(program.command("run")))
    .option("--yes", "skip the cost confirmation prompt")
    .description("Export, then analyze, then print the portal link.")
    .action(notBuilt("run"));

  withDateRange(withServer(program.command("report")))
    .option("--email", "email the report to the server's recipients")
    .option("--dry-run", "with --email: show the email without sending it")
    .description("Build the PDF report for a pulse.")
    .action(notBuilt("report"));

  withDateRange(withServer(program.command("xlsx")))
    .description("Write the .xlsx data file locally.")
    .action(notBuilt("xlsx"));

  withDateRange(withServer(program.command("csv")))
    .description("Write the CSV data files locally.")
    .action(notBuilt("csv"));

  return program;
}

// Only run when executed directly (not when imported by tests).
const isDirectRun =
  process.argv[1] !== undefined &&
  (process.argv[1].endsWith("/src/index.ts") ||
    process.argv[1].endsWith("/dist/index.js") ||
    process.argv[1].endsWith("/bin/pulse.js") ||
    process.argv[1].endsWith("/pulse"));

if (isDirectRun) {
  buildProgram().parseAsync(process.argv);
}
