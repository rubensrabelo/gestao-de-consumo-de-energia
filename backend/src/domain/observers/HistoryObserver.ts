import { Observer } from "./Observer";

export class HistoryObserver implements Observer {
  update(event: string): void {
    console.log("HISTORY LOG:", event);
  }
}
