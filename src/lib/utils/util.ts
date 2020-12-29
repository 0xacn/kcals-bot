import KcalsClient from "../KcalsClient";
import { KcalsGuild, KcalsGuildMessage, PermissionLevel } from "../types/kcalsbot";
import Command from "../structures/Command";
import { ACCESS_TITLE } from "./constants";

export const fetchAccess = async (guild: KcalsGuild) => {
  if ((await guild.fetchPermissions(guild.ownerID)).level > 5)
    return ACCESS_TITLE.STAFF;

  return ACCESS_TITLE.DEFAULT;
};

export const permissionError = (client: KcalsClient, message: KcalsGuildMessage, command: Command, userLevel: PermissionLevel, permission?: 0 | 1 | -1 | 2 | 3 | 4 | 10) => {
  // eslint-disable-next-line max-len
  const requiredLevel = client.handlers.permissions.levels.get(permission ? permission : command.permission) as PermissionLevel;

  return "Missing perms: " + userLevel.level + ", need lv: " + requiredLevel.level;
};