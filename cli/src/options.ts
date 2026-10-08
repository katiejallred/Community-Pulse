import { Command, Option } from "commander";

export const DEFAULT_DAYS = 90;

/** Add --server to a command. Every command that touches one server uses this. */
export function withServer(cmd: Command): Command {
  return cmd.requiredOption("--server <name or id>", "Discord server name or id");
}

/**
 * Add the date-range flags shared by export, analyze, run, report, xlsx, csv.
 * Default is the last 90 days. --days changes the window; --from/--to set exact dates.
 */
export function withDateRange(cmd: Command): Command {
  return cmd
    .addOption(new Option("--days <n>", `look back this many days (default ${DEFAULT_DAYS})`).argParser(Number))
    .option("--from <YYYY-MM-DD>", "start date (inclusive)")
    .option("--to <YYYY-MM-DD>", "end date (inclusive)");
}
