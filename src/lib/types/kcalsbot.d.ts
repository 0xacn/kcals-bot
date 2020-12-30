import {
  Guild,
  GuildMember,
  GuildChannel,
  Message,
  MessageEmbed,
  MessageOptions,
  TextChannel,
  User
} from "discord.js";
import Cluster from "../KcalsClient";

export interface CommandOptions {
  description?: string;
  usage?: string;
  aliases?: string[];
  dm?: boolean;
  permission?: -1 | 0 | 2 | 3 | 4 | 10;
  mode?: 0 | 1 | 2;
  access?: 0 | 1 | 3;
  ptb?: boolean;
}

export interface GuildSettings {
  apikey?: string | null;
  id: string;
  language: string;
  dm: {
    commands: boolean;
  };
  embed: boolean;
  roles: {
    administrator: string[];
    moderator: string[];
    blacklist: string[];
    public: string[];
    mute: string | null;
  };
  announcements: {
    id: string | null;
    mention: string | null;
  };
  aliases: KcalsCommandAlias[];
  mode: "free" | "lite" | "strict";
  prefix: {
    custom: string | null;
    default: boolean;
  };
}

export interface PermissionLevelOptions {
  title: string;
  level: -1 | 0 | 2 | 3 | 4 | 10;
  staff?: boolean;
  staffOverride?: boolean;
}

export interface PermissionLevel {
  title: string;
  level: -1 | 0 | 2 | 3 | 4 | 10;
  staff?: boolean;
  staffOverride?: boolean;
  check(guild: Guild, member: GuildMember): boolean;
}

export interface ModlogAction {
  hex: number;
  display: string;
}

export interface KcalsCommandAlias {
  alias: string;
  command: string;
}

export interface AccessLevel {
  level: 0 | 1 | 3;
  title: "Default" | "Kcals Staff";
}

export interface KcalsMessage extends Message {
  menuResponse?: Message;
  embeddable: boolean;
  ask(question: string): Promise<Message | undefined>;
  chooseOption(options: string[]): Promise<string | undefined>;

  dm(
    content: string | MessageEmbed,
    embed?: MessageEmbed,
    options?: MessageOptions
  ): Promise<Message>;
  error(
    content: string | MessageEmbed,
    embed?: MessageEmbed,
    options?: MessageOptions
  ): Promise<Message>;
  send(
    content: string | MessageEmbed,
    embed?: MessageEmbed,
    options?: MessageOptions
  ): Promise<Message>;
  success(
    content: string | MessageEmbed,
    embed?: MessageEmbed,
    options?: MessageOptions
  ): Promise<Message>;
  respond(
    content: string | MessageEmbed,
    embed?: MessageEmbed,
    options?: MessageOptions
  ): Promise<Message>;
}

export interface KcalsGuildMessage extends KcalsMessage {
  author: User;
  guild: KcalsGuild;
  member: KcalsGuildMember;
  channel: TextChannel;
}

export interface KcalsGuildMember extends GuildMember { }

export interface KcalsGuild extends Guild {
  client: Cluster;
  settings: GuildSettings;
}

export interface SettingsData {
  description: string;
  value: unknown;
  type: "boolean" | "roles" | "role" | "channel" | "log" | "ms" | "default";
  path: string;
}

export interface FormatMessageOptions {
  oldMember?: KcalsGuildMember;
  channel?: GuildChannel;
  message?: KcalsGuildMessage;
}