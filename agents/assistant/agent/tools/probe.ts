import { defineWorkflowTool } from "eve/tools";
import { z } from "zod";

// Minimal repro for https://github.com/vercel/eve/issues/3628 (still open after #3629).
// This tool's compiled workflowId is stamped relative to the workspace root
// instead of this agent's own app root (agents/assistant/), because it has
// no package.json of its own -- the documented shape of an eve workspace
// member. Dispatching this tool in a real session fails with:
//   Tool "probe" is not registered as a workflow in this deployment
//   (workflow//./agents/assistant/agent/tools/probe//execute).
//   The tool was renamed or removed after this run started.
export default defineWorkflowTool({
  description: "Minimal background workflow tool reproducing the workspace workflowId mismatch.",
  execution: "background",
  inputSchema: z.object({}),
  async execute() {
    "use workflow";
    return { status: "ok" };
  },
});
