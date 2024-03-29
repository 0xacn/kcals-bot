import Command from "../../lib/structures/Command";
import { KcalsMessage } from "../../lib/types/kcalsbot";
import { MODE } from "../../lib/utils/constants";

export default class Help extends Command {
  aliases = ["info", "support"];
  dm = true;
  mode = MODE.STRICT;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: KcalsMessage, parameters: string) {
    return await message.send("Hello");
  }
}