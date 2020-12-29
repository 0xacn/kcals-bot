import { Client as VezaClient } from "veza";
import { Client } from "discord.js";

export default class Cluster extends Client {
  public node: VezaClient | undefined;
  public shards: number[] = JSON.parse(process.env.SHARDS ?? "[1]");
  public shardCount = process.env.TOTAL_SHARD_COUNT && "1";
  public cluster = `${process.env.CLUSTER} [${this.shards.join(",")}]`;

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
    this.login(process.env.TOKEN!);
  }

  public async login(token: string): Promise<string> {
    // Setup database
    // ...

    // Setup handlers
    // ...

    return super.login(token);
  }
}