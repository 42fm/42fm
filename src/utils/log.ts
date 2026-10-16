class Logger {
  private label?: string;

  constructor(label?: string) {
    this.label = label;
  }

  private common(): [string, string[]] {
    let message = `%c42FM%c`;
    const styles = ["color: #ff7a00", ""];

    if (this.label) {
      message += `${this.label ? ` %c${this.label}%c` : ""}`;
      styles.push("color:gray", "");
    }

    return [message, styles];
  }

  public error(...data: unknown[]) {
    const [message, styles] = this.common();
    console.error(message + ` %cERROR%c`, ...styles, "color: #ea6c73", "", ...data);
  }

  public warn(...data: unknown[]) {
    const [message, styles] = this.common();
    console.warn(message + ` %cWARN%c`, ...styles, "color: #f9af4f", "", ...data);
  }

  public info(...data: unknown[]) {
    const [message, styles] = this.common();
    console.info(message + ` %cINFO%c`, ...styles, "color: #7fd962", "", ...data);
  }

  public debug(...data: unknown[]) {
    const [message, styles] = this.common();
    console.debug(message + ` %cDEBUG%c`, ...styles, "color: #53bdfa", "", ...data);
  }
}

export { Logger };
