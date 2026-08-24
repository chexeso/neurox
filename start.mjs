import { spawn } from "child_process";

const port = process.env.PORT || "3000";
console.log("[neurox] starting on 0.0.0.0:" + port);

const child = spawn(
  "npx",
  ["next", "start", "--hostname", "0.0.0.0", "--port", String(port)],
  { stdio: "inherit", shell: true, env: process.env }
);

child.on("exit", (code) => process.exit(code ?? 1));