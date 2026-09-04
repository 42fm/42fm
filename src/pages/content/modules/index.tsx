export interface Attachable {
  attach(element?: Element): Promise<void> | void;
  detach(element?: Element): Promise<void> | void;
}

export interface AttachableOnce {
  attach(element?: Element): Promise<void> | void;
}
