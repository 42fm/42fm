type LogTypes = "info" | "error" | "warn" | "debug";

const log = (type: LogTypes, ...data: any[]) => {
  if (type === "error") {
    console.error("%c[42FM]", "color: #7f00ff", `[${type}]: ${data}`);
  } else {
    console.log("%c[42FM]", "color: #7f00ff", `[${type}]: ${data}`);
  }
};

export { log };
