import { GuildSettings } from "./kcalsbot";
import Cluster from "../KcalsClient";

declare module "discord.js" {
  interface Guild {
    client: Cluster;
    settings: GuildSettings;
  }

  interface GuildMember {
    client: Cluster;
  }
}