import { ContextMenuCommandBuilder } from "discord.js";
import { CommandType } from "../../../types/constants.js";
import { CommandModule, CommandModuleData } from "./CommandModule.js";
import { ContextMenuCommandExecuteFunction } from "../../../types/structures.js";

export interface ContextMenuCommandModuleData extends CommandModuleData {
    command_type: CommandType.ContextMenuCommand;
    data: ContextMenuCommandBuilder;
    execute: ContextMenuCommandExecuteFunction
}

export abstract class ContextMenuCommandModule extends CommandModule implements ContextMenuCommandModuleData {
    public readonly command_type: CommandType.ContextMenuCommand = CommandType.ContextMenuCommand;
    public abstract data: ContextMenuCommandBuilder;
    public abstract execute: ContextMenuCommandExecuteFunction;
}