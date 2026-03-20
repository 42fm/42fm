class Logger {
  public error(...data: any[]) {
    console.error(`%c42fm %c[error]:`, "color: #ff7a00", "color: #ef4444", ...data);
  }

  public warn(...data: any[]) {
    console.warn(`%c42fm %c[warn]:`, "color: #ff7a00", "color: #eab308", ...data);
  }

  public info(...data: any[]) {
    console.log(`%c42fm %c[info]:`, "color: #ff7a00", "color: #0ea5e9", ...data);
  }

  public debug(...data: any[]) {
    console.debug(`%c42fm %c[debug]:`, "color: #ff7a00", "color: #22c55e", ...data);
  }
}

const logger = new Logger();

export { logger };
