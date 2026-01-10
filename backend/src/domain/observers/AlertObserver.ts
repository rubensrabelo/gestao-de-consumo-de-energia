import { Observer } from "./Observer";

export class AlertObserver implements Observer {
  update(event: string): void {
    console.log("ALERT:", event);
  }
}
