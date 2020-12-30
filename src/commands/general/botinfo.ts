import { NONAME } from 'dns';
import { model } from 'mongoose';
import Command from '../../lib/structures/Command';
import { KcalsMessage } from '../../lib/types/kcalsbot';;
import { MODE } from '../../lib/utils/constants';


export default class Botinfo extends Command {
  aliases = [''];
  dm = false;
  mode = MODE.STRICT

  async execute(message: KcalsMessage, parameters: string) {
    return await message.send("Bot info")
  }
}