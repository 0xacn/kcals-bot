import Command from "../../lib/structures/Command";
import { KcalsMessage } from "../../lib/types/kcalsbot";
import { MODE } from "../../lib/utils/constants";

export default class Bedwars extends Command {
  aliases = ["bw"];
  dm = true;
  mode = MODE.STRICT;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: KcalsMessage, parameters: string) {
    return message.send("Hello");
  }
}
