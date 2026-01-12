import { emitNotification } from "../../infra/socket/socket";
import { Observer } from "./Observer";

export class FrontendNotificationObserver implements Observer {
  update(event: string): void {
    console.log("SENDING TO FRONTEND:", event);    
    emitNotification(`Evento registrado: ${event}`);
  }
}
