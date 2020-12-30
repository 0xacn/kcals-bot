import "./extensions/KcalsGuild";
import "./extensions/KcalsGuildMember";
import "./extensions/KcalsMessage";

import { Client } from "discord.js";

import { Client as VezaClient } from "veza";
import Logger from "./utils/Logger";

// Handlers
import CommandHandler from "../handlers/CommandHandler";
import EventHandler from "../handlers/EventHandler";

export default class Cluster extends Client {
  public node: VezaClient | undefined;
  public shards: number[] = JSON.parse(process.env.SHARDS ?? "[1]");
  public shardCount = process.env.TOTAL_SHARD_COUNT && "1";
  public cluster = `${process.env.CLUSTER} [${this.shards.join(",")}]`;

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  public commands = new CommandHandler(this);
  public events = new EventHandler(this);

  public logger = new Logger();
  public owners: string[] = ["Simonn#6377"];

  public constructor(node: VezaClient | undefined) {
    super({
      messageCacheMaxSize: 300,
      messageCacheLifetime: 900,
      messageSweepInterval: 180,
      disableMentions: "everyone",
      partials: ["MESSAGE"],
      presence: { activity: { name: `${process.env.PREFIX!}help`, type: "WATCHING" } },
    });

    this.node = node;

    // TODO: Send error to sentry
    this.login(process.env.TOKEN!).catch((err) => console.log(err));
  }

  public async login(token: string): Promise<string> {
    // Setup database
    // ...

    // Setup handlers
    // ...

    return super.login(token);
  }
}