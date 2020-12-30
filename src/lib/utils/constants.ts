/* eslint-disable @typescript-eslint/naming-convention */
export const LINK = {
  ICON: `https://cdn.discordapp.com/icons/678348607463751683/aa71447b87024e907685155048a3a269.png?size=128`,
  VOTE: "https://top.gg/bot/ID_HERE/vote"
};

export enum ACCESS_LEVEL {
  DEFAULT = 0,
  STAFF = 3
}

export const ACCESS_TITLE = {
  DEFAULT: { level: 0, title: "Default" },
  STAFF: { level: 3, title: "KcalsBot Staff" }
};

export enum PERMISSION_LEVEL {
  SERVER_BLACKLISTED = -1,
  SERVER_MEMBER = 0,
  SERVER_MODERATOR = 2,
  SERVER_ADMINISTRATOR = 3,
  SERVER_OWNER = 4,
  BOT_OWNER = 10
}

export const PERMISSION_ROLE_TITLE = {
  ADMINISTRATOR: "KcalsBot Administrator",
  MODERATOR: "KcalsBot Moderator",
  BLACKLIST: "KcalsBot Blacklist"
};

export enum MODE {
  FREE = 0,
  LITE = 1,
  STRICT = 2
}