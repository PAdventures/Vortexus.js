import { Awaitable } from "discord.js";
import { CommandType, version } from "../../types/constants.js";
import { AnyCommandExecuteData, ContextMenuCommandPreconditionExecuteFunction, MessageCommandPreconditionExecuteFunction, SlashCommandPreconditionExecuteFunction } from "../../types/structures.js";
import { Precondition } from "../structures/Precondition.js";
import { CooldownData } from "../structures/Cooldown.js";

export class CooldownPrecondition extends Precondition {
    public readonly unique_name: string = "vortexus.js.cooldown";
    public readonly versions: string | string[] = version;

    public readonly slashCommandExecute: SlashCommandPreconditionExecuteFunction = (data) => this._execute(data);
    public readonly contextMenuCommandExecute: ContextMenuCommandPreconditionExecuteFunction = (data) => this._execute(data);
    public readonly messageCommandExecute: MessageCommandPreconditionExecuteFunction = (data) => this._execute(data);

    private _execute(data: AnyCommandExecuteData): Awaitable<Precondition.Result> {
        if (!data.module.cooldown) return this.OK()

        const cooldownData: Omit<CooldownData, 'endsAt'> = {
            commandName: data.builder.name,
            userId: data.type === CommandType.MessageCommand ? data.message.author.id : data.interaction.user.id,
            guildId: (data.type === CommandType.MessageCommand ? data.message.guildId : data.interaction.guildId) ?? undefined,
            channelId: (data.type === CommandType.MessageCommand ? data.message.channelId : data.interaction.channelId) ?? undefined
        }

        const cooldown = data.client.cooldowns.find(cooldownData)
        if (cooldown) return this.ERR()

        data.client.cooldowns.create({
            ...cooldownData,
            endsAt: new Date(Date.now() + data.module.cooldown)
        });

        return this.OK()
    }
}