// Shared database schema for Community Pulse.
//
// Both the CLI (cli/) and the portal (web/) import their tables from here so
// there is exactly one definition of the data.
//
// The tables themselves are added in process step 2 ("Set up the database and
// schema"). Planned tables: servers, server_profiles, channels, messages,
// pulses, feedback_items, themes.
export {};
