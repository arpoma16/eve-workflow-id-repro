import { openai } from "eve/models/openai";
import { defineAgent } from "eve";

export default defineAgent({
  // Keep the reproduction to exactly one tool: the built-in default tool set
  // (bash, read_file, connection_search, ask_question, etc.) gives the model
  // other ways to respond, which makes triggering `probe` non-deterministic.
  defaultTools: false,
  model: openai("gpt-4.1"),
});
