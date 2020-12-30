import { Structures } from "discord.js";

export class KcalsGuild extends Structures.get("Guild") { }

Structures.extend("Guild", () => KcalsGuild);