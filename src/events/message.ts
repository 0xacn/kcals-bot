import { Message, GuildMember, User } from "discord.js";
import Event from "../lib/structures/Event";
import { KcalsGuildMessage } from "../lib/types/kcalsbot";
import { PERMISSION_LEVEL } from "../lib/utils/constants";
import { fetchAccess } from "../lib/utils/util";
import { permissionError } from "../lib/utils/util";

export default class extends Event {
  async execute(message: Message | KcalsGuildMessage) {
    if (message.partial || (message.author?.bot)) return;

    if (message.channel.type === "dm")
      return this.handleDM(message as Message);

    return this.handleGuild(message as KcalsGuildMessage);
  }

  async handleGuild(message: KcalsGuildMessage) {
    if (!message.guild.available) return;
    if (!message.guild.me)
      await message.guild.members.fetch(process.env.ID!);

    const botMember = message.guild.me as GuildMember;
    const botSendPerms = message.channel.permissionsFor(botMember);
    if (!botSendPerms || !botSendPerms.has("SEND_MESSAGES")) return;

    const userPermissions = await this.client.handlers.permissions.fetch(message.guild, message.author.id);
    // eslint-disable-next-line max-len
    const actualUserPermissions = await this.client.handlers.permissions.fetch(message.guild, message.author.id, true);

    if (
      userPermissions.level ===
            PERMISSION_LEVEL.SERVER_BLACKLISTED
    )
      return;

    const [split, ...params] = message.content.split(" ");

    const prefix = this.matchPrefix(message.author, split);
    if (!prefix || !message.content.startsWith(prefix)) return;

    const command = this.client.commands.fetch(split.slice(prefix.length).toLowerCase());
    if (!command) return;
    if (!message.member)
      await message.guild.members.fetch(message.author.id);

    const accessLevel = await fetchAccess(message.guild);
    if (command.access && accessLevel.level < command.access) {
      return message.error("Missing access");
    }

    if (
      userPermissions.level < command.permission ||
            (actualUserPermissions.level < command.permission &&
                actualUserPermissions.level !==
                PERMISSION_LEVEL.SERVER_BLACKLISTED &&
                command.permission <= PERMISSION_LEVEL.SERVER_OWNER)
    ) {
      return message.error(permissionError(this.client, message, command, actualUserPermissions));
    }

    return command.execute(message, params.join(" "), userPermissions);
  }

  matchPrefix(user: User, command: string) {
    if (
      command.startsWith(process.env.PREFIX!) &&
            this.client.owners.includes(user.id)
    )
      return process.env.PREFIX;
    if (
      command.startsWith(process.env.PREFIX!)
    )
      return process.env.PREFIX;

    return null;
  }

  handleDM(message: Message) {
    if (!message.content.startsWith(process.env.PREFIX!)) return;

    const command = this.client.commands.get(message.content
      .split(" ")[0]
      .slice(process.env.PREFIX!.length));

    if (
      !command ||
            !command.dm ||
            command.permission > PERMISSION_LEVEL.SERVER_MEMBER
    )
      return;

    command.execute(message);
  }
}