import { CommandType } from "../../types/constants.js";
import { MessageCommandExecuteFunction } from "../../types/structures.js";
import { MessageCommandBuilder } from "../builders/MessageCommandBuilder.js";
import { CommandModule, CommandModuleData } from "./CommandModule.js";

export interface MessageCommandModuleData extends CommandModuleData {
    command_type: CommandType.MessageCommand;
    data: MessageCommandBuilder;
    execute: MessageCommandExecuteFunction
}

export abstract class MessageCommandModule extends CommandModule implements MessageCommandModuleData {
    public readonly command_type: CommandType.MessageCommand = CommandType.MessageCommand;
    public abstract data: MessageCommandBuilder;
    public abstract execute: MessageCommandExecuteFunction;
}