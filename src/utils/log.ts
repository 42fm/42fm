class Logger {
  private label?: string;

  constructor(label?: string) {
    this.label = label;
  }

  public error(...data: any[]) {
    console.error(`%c[42fm] %c[error]${this.label ? ` (${this.label})` : ""}:`, "color: #ff7a00", "color: #ef4444", ...data);
  }

  public warn(...data: any[]) {
    console.warn(`%c[42fm] %c[warn]${this.label ? ` (${this.label})` : ""}:`, "color: #ff7a00", "color: #eab308", ...data);
  }

  public info(...data: any[]) {
    console.log(`%c[42fm] %c[info]${this.label ? ` (${this.label})` : ""}:`, "color: #ff7a00", "color: #22c55e", ...data);
  }

  public debug(...data: any[]) {
    console.debug(`%c[42fm] %c[debug]${this.label ? ` (${this.label})` : ""}:`, "color: #ff7a00", "color: #0ea5e9", ...data);
  }
}

export { Logger };
