import { SlashCommandBuilder } from "discord.js";
import { CommandType } from "../../types/constants.js";
import { CommandModule, CommandModuleData } from "./CommandModule.js";
import { SlashCommandExecuteFunction } from "../../types/structures.js";

export interface SlashCommandModuleData extends CommandModuleData {
    command_type: CommandType.SlashCommand;
    data: SlashCommandBuilder;
    execute: SlashCommandExecuteFunction;
}

export abstract class SlashCommandModule extends CommandModule implements SlashCommandModuleData {
    public readonly command_type: CommandType.SlashCommand = CommandType.SlashCommand;
    public abstract data: SlashCommandBuilder;
    public abstract execute: SlashCommandExecuteFunction;
}