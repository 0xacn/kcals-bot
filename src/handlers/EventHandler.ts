import { join, parse } from "path";
import { Collection } from "discord.js";
import klaw from "klaw";
import Cluster from "../lib/KcalsClient";
import Event from "../lib/structures/Event";

export default class CommandHandler extends Collection<string, Event> {
  client: Cluster;

  constructor(client: Cluster) {
    super();

    this.client = client;

    // TODO: Send error to Sentry
    this.init().catch((err) => console.log(err));
  }

  async init() {
    const path = join(__dirname, "..", "events");
    const start = Date.now();

    klaw(path)
      .on("data", (item) => {
        const file = parse(item.path);
        if (!file.ext || file.ext !== ".js") return;

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const Event = ((r) => r.default || r)(require(join(file.dir, file.base)));
        const event: Event = new Event(this.client, file.name, join(file.dir, file.base));

        this.set(file.name, event);

        // @ts-ignore
        this.client[event.once ? "once" : "on"](event.name, (...args: unknown[]) => event.execute(...args));
      })
      .on("end", () => {
        this.client.logger.info(`Loaded ${this.size} Events in ${Date.now() - start}ms`);
      });
  }
}