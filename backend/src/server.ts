import app from "./app";
import { createServer } from "http";
import { initSocket } from "./infra/socket/socket";

const httpServer = createServer(app);

initSocket(httpServer);

const PORT = process.env.APP_PORT || 3333;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});