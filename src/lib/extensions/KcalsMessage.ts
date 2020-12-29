import {
  DMChannel,
  Message,
  MessageEmbed,
  MessageOptions,
  Structures,
} from "discord.js";

export class KcalsMessage extends Structures.get("Message") {
  menuResponse?: Message = undefined;

  get embeddable() {
    if (
      !this.guild ||
          !this.guild.me ||
          !this.guild.settings ||
          !this.guild.settings.embed ||
          this.channel instanceof DMChannel
    )
      return false;

    const perms = this.channel.permissionsFor(this.guild.me);
    if (!perms) return false;

    return perms.has("EMBED_LINKS");
  }

  async ask(question: string) {
    this.menuResponse = this.menuResponse ? await this.menuResponse.edit(question) : await this.respond(question);

    const responses = await this.channel.awaitMessages((msg) =>
      msg.author.id === this.author.id, { time: 15000, max: 1 });
    return responses.first();
  }

  async chooseOption(options: string[]) {
    const response = await this.ask([
      "OPTION_1",
      "\n",
      "OPTION_2"
    ].join("\n"));

    if (!response) {
      this.menuResponse?.delete().catch(() => undefined);
      return;
    }

    const CANCEL_OPTIONS = ["cancel"];
    if (CANCEL_OPTIONS.includes(response.content.toLowerCase())) {
      if (response.deletable) response.delete().catch(() => undefined);
      this.menuResponse?.delete().catch(() => undefined);
      await this.respond("Cancelled");
      return;
    }

    const number = Number(response.content);
    if (!number || number > options.length) {
      this.menuResponse?.delete().catch(() => undefined);
      return;
    }

    if (response.deletable) response.delete().catch(() => undefined);

    return options[Math.floor(number) - 1];
  }

  respond(content: string, embed?: MessageEmbed) {
    return this.channel.send(`${this.author} | ${content}`, {embed});
  }

  send(content: string | MessageEmbed,
    embed?: MessageEmbed,
    options?: MessageOptions) {
    if (typeof content === "string") {
      return this.channel.send(content, { ...options, embed });
    }
    return this.channel.send(content);
  }

  embed(embed: MessageEmbed) {
    return this.channel.send("", embed);
  }

  success(content: string, embed?: MessageEmbed) {
    return this.channel.send(`${this.author} | ✔️ | ${content}`, { embed });
  }

  error(content: string, embed?: MessageEmbed, options?: MessageOptions) {
    return this.channel.send(`${this.author} | ❌ | ${content}`, { ...options, embed });
  }

  dm(content: string | MessageEmbed,
    embed?: MessageEmbed,
    options?: MessageOptions) {
    return this.author?.send(content, { ...options, embed });
  }
}

Structures.extend("Message", () => KcalsMessage);