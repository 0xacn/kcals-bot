import { Structures } from "discord.js";

export class KcalsGuild extends Structures.get("Guild") {
  async fetchPermissions(userID: string, ignoreStaff = false) {
    return this.client.handlers.permissions.fetch(this, userID, ignoreStaff);
  }
}

Structures.extend("Guild", () => KcalsGuild);