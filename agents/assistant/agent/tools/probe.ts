import { defineWorkflowTool } from "eve/tools";
import { z } from "zod";

// Minimal repro for https://github.com/vercel/eve/issues/3628 (still open after #3629;
// reproduced with eve@0.69.0 from the npm registry).
// This tool's compiled workflowId is stamped relative to the workspace root
// instead of this agent's own app root (agents/assistant/), because it has
// no package.json of its own -- the documented shape of an eve workspace
// member. Dispatching this tool in a real session fails every task with:
//   Tool "probe" is not registered as a workflow in this deployment
//   (workflow//./agents/assistant/agent/tools/probe//task).
//   The tool was renamed or removed after this run started.
// eve 0.69 replaced `execution: "background"` with the `task` entry point,
// so the workflowId suffix is now //task instead of //execute.
export default defineWorkflowTool({
  description: "Minimal background workflow tool reproducing the workspace workflowId mismatch.",
  inputSchema: z.object({}),
  async task() {
    "use workflow";
    return { status: "ok" };
  },
});
