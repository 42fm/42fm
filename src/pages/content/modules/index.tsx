export interface Attachable {
  attach(): void;
  detach(): void;
}

export interface AttachableElement {
  attach(element: Element): void;
  detach(): void;
}
