import dotenv from "dotenv";
import fs from "fs";
import { Client, ClientSocket, NodeMessage } from "veza";
import Cluster from "./lib/KcalsClient";

dotenv.config();

fs.mkdir("data", (err) => {
  if (err && err.code !== "EEXIST") console.error(err);
});

if (!process.env.CLUSTERED) {
  new Cluster(undefined);
} else {
  const node = new Client("KcalsBot");

  node.on("error", (error: Error, client: ClientSocket) => {
    console.error(`[IPC] Error from ${client.name}:`, error);
  });

  node.on("disconnect", (client: ClientSocket) => {
    console.error(`[IPC] Disconnected from ${client.name}`);
  });

  node.on("ready", async (client: ClientSocket) => {
    console.log(`[IPC] Connected to: ${client.name}`);
  });

  node.connectTo(process.env.NODE_PORT!).catch((error) => {
    console.error("[IPC] Disconencted!", error);
  });

  const client = new Cluster(node);

  node.on("message", async (message: NodeMessage) => {
    if (message.data.event === "collectData") {
      message.reply(eval(`client.${message.data.data}`));
    } else if (message.data.event === "shardCount") {
      message.reply(client.shardCount);
    }
  });
}
