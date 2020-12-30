import { Structures } from "discord.js";

export class KcalsGuildMember extends Structures.get("GuildMember") { }

Structures.extend("GuildMember", () => KcalsGuildMember);