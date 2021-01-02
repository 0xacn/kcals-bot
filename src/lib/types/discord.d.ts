import { GuildSettings } from "./kcalsbot";
import Cluster from "../KcalsClient";

declare module "discord.js" {
  interface Client {
    translate: Map<string, TFunction>;
  }

  interface Guild {
    client: Cluster;
    settings: GuildSettings;
  }

  interface GuildMember {
    client: Cluster;
  }
}
