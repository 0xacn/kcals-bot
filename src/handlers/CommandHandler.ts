import { join, parse } from "path";
import { Collection } from "discord.js";
import klaw from "klaw";
import Cluster from "../lib/KcalsClient";
import Command from "../lib/structures/Command";

export default class CommandHandler extends Collection<string, Command> {
  client: Cluster;

  constructor(client: Cluster) {
    super();

    this.client = client;

    // TODO: Send error to Sentry
    this.init().catch((err) => console.log(err));
  }

  async init() {
    const path = join(__dirname, "..", "commands");
    const start = Date.now();

    klaw(path)
      .on("data", (item) => {
        const file = parse(item.path);
        if (!file.ext || file.ext !== ".js") return;

        const req = ((r) => r.default || r)(require(join(file.dir, file.base)));
        const newReq = new req(this.client, file.name, join(file.dir, file.base));

        this.set(file.name, newReq);
      })
      .on("end", () => {
        this.client.logger.info(`Loaded ${this.size} Commands in ${Date.now() - start}ms`);

        return this;
      });
  }

  fetch(name: string) {
    if (this.has(name)) return this.get(name) as Command;

    const commandAlias = this.find((c) => c.aliases.includes(name));
    if (commandAlias) return commandAlias;

    return null;
  }
}