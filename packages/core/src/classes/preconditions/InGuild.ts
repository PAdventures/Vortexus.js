import { Awaitable } from "discord.js";
import { CommandType, version } from "../../types/constants.js";
import { AnyCommandExecuteData, ContextMenuCommandPreconditionExecuteFunction, MessageCommandPreconditionExecuteFunction, SlashCommandPreconditionExecuteFunction } from "../../types/structures.js";
import { Precondition } from "../structures/Precondition.js";

export class InGuildPrecondition extends Precondition {
    public unique_name: string = "vortexus.js.in.guild";
    public versions: string | string[] = version;

    public readonly slashCommandExecute: SlashCommandPreconditionExecuteFunction = (data) => this._execute(data)
    public readonly contextMenuCommandExecute: ContextMenuCommandPreconditionExecuteFunction = (data) => this._execute(data)
    public readonly messageCommandExecute: MessageCommandPreconditionExecuteFunction = (data) => this._execute(data)

    private _execute(data: AnyCommandExecuteData): Awaitable<Precondition.Result> {
        if (data.type === CommandType.MessageCommand ? data.message.inGuild() : data.interaction.inGuild() && data.interaction.inCachedGuild()) return this.OK();
        return this.ERR()
    }
}