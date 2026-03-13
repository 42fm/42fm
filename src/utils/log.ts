class Logger {
  public error(...data: any[]) {
    console.error("%c[42FM]", "color: #FF7A00", `[error]`, data);
  }

  public warn(...data: any[]) {
    console.warn("%c[42FM]", "color: #FF7A00", `[warn]`, data);
  }

  public info(...data: any[]) {
    console.log("%c[42FM]", "color: #FF7A00", `[info]`, data);
  }

  public debug(...data: any[]) {
    console.debug("%c[42FM]", "color: #FF7A00", `[debug]`, data);
  }
}

const logger = new Logger();

export { logger };
