import { CacheType, ChatInputCommandInteraction, ContextMenuCommandBuilder, SlashCommandBuilder, ContextMenuCommandInteraction, Message, Awaitable, JSONEncodable } from "discord.js";
import { MessageCommandBuilder } from "../classes/builders/MessageCommandBuilder.js";
import { CommandType } from "./constants.js";
import { VortexusClient } from "../classes/structures/VortexusClient.js";
import { MessageCommandBooleanOptionBuilder, MessageCommandBooleanOptionBuilderData, MessageCommandChannelOptionBuilder, MessageCommandChannelOptionBuilderData, MessageCommandIntegerOptionBuilder, MessageCommandIntegerOptionBuilderData, MessageCommandNumberOptionBuilder, MessageCommandNumberOptionBuilderData, MessageCommandRoleOptionBuilder, MessageCommandRoleOptionBuilderData, MessageCommandStringOptionBuilder, MessageCommandStringOptionBuilderData, MessageCommandUserOptionBuilder, MessageCommandUserOptionBuilderData } from "../classes/builders/MessageCommandOptionBuilders.js";
import { SlashCommandModule, SlashCommandModuleData } from "../classes/modules/SlashCommandModule.js";
import { ContextMenuCommandModule, ContextMenuCommandModuleData } from '../classes/modules/ContextMenuCommandModule.js';
import { MessageCommandModule, MessageCommandModuleData } from "../classes/modules/MessageCommandModule.js";
import { NormalCooldown, NormalCooldownData, SubcommandCooldown, SubcommandCooldownData, SubcommandGroupCooldown, SubcommandGroupCooldownData } from "../classes/structures/Cooldowns.js";

// Builder interfaces and types

export interface SlashCommandExecuteData<Cached extends CacheType = CacheType> {
    type: CommandType.SlashCommand;
    builder: SlashCommandBuilder;
    interaction: ChatInputCommandInteraction<Cached>;
    client: VortexusClient<true>;
}

export interface ContextMenuCommandExecuteData<Cached extends CacheType = CacheType> {
    type: CommandType.ContextMenuCommand;
    builder: ContextMenuCommandBuilder;
    interaction: ContextMenuCommandInteraction<Cached>;
    client: VortexusClient<true>
}

export interface MessageCommandExecuteData<InGuild extends boolean = boolean> {
    type: CommandType.MessageCommand;
    builder: MessageCommandBuilder;
    message: Message<InGuild>;
    client: VortexusClient<true>
}

export type SlashCommandExecuteFunction = (slashCommandExecuteData: SlashCommandExecuteData) => Awaitable<void>;
export type ContextMenuCommandExecuteFunction = (contextMenuCommandExecuteData: ContextMenuCommandExecuteData) => Awaitable<void>;
export type MessageCommandExecuteFunction = (messageCommandExecuteData: MessageCommandExecuteData) => Awaitable<void>;

export type SlashCommandModuleResolvable = SlashCommandModuleData | JSONEncodable<SlashCommandModuleData>;
export type ContextMenuCommandModuleResolvable = ContextMenuCommandModuleData | JSONEncodable<ContextMenuCommandModuleData>;
export type MessageCommandModuleResolvable = MessageCommandModuleData | JSONEncodable<MessageCommandModuleData>;

export type MessageCommandStringOptionResolvable = MessageCommandStringOptionBuilderData | JSONEncodable<MessageCommandStringOptionBuilderData>;
export type MessageCommandIntegerOptionResolvable = MessageCommandIntegerOptionBuilderData | JSONEncodable<MessageCommandIntegerOptionBuilderData>;
export type MessageCommandNumberOptionResolvable = MessageCommandNumberOptionBuilderData | JSONEncodable<MessageCommandNumberOptionBuilderData>;
export type MessageCommandBooleanOptionResolvable = MessageCommandBooleanOptionBuilderData | JSONEncodable<MessageCommandBooleanOptionBuilderData>;
export type MessageCommandUserOptionResolvable = MessageCommandUserOptionBuilderData | JSONEncodable<MessageCommandUserOptionBuilderData>;
export type MessageCommandChannelOptionResolvable = MessageCommandChannelOptionBuilderData | JSONEncodable<MessageCommandChannelOptionBuilderData>
export type MessageCommandRoleOptionResolvable = MessageCommandRoleOptionBuilderData | JSONEncodable<MessageCommandRoleOptionBuilderData>

// Any types

export type AnyCommandBuilder = SlashCommandBuilder | ContextMenuCommandBuilder | MessageCommandBuilder
export type AnyCommandBuilderResolvable = AnyCommandBuilder | JSONEncodable<AnyCommandBuilder>
export type AnyCommandExecuteData = SlashCommandExecuteData | ContextMenuCommandExecuteData | MessageCommandExecuteData
export type AnyCommandExecuteFunction = SlashCommandExecuteFunction | ContextMenuCommandExecuteFunction | MessageCommandExecuteFunction
export type AnyMessageCommandOptionBuilder = MessageCommandStringOptionBuilder |
    MessageCommandIntegerOptionBuilder |
    MessageCommandNumberOptionBuilder |
    MessageCommandBooleanOptionBuilder |
    MessageCommandUserOptionBuilder |
    MessageCommandChannelOptionBuilder |
    MessageCommandRoleOptionBuilder
export type AnyMessageCommandOptionBuilderData = MessageCommandStringOptionBuilderData |
    MessageCommandIntegerOptionBuilderData |
    MessageCommandNumberOptionBuilderData |
    MessageCommandBooleanOptionBuilderData |
    MessageCommandUserOptionBuilderData |
    MessageCommandChannelOptionBuilderData |
    MessageCommandRoleOptionBuilderData
export type AnyMessageCommandOptionResolvable = MessageCommandStringOptionResolvable |
    MessageCommandIntegerOptionResolvable |
    MessageCommandNumberOptionResolvable |
    MessageCommandBooleanOptionResolvable |
    MessageCommandUserOptionResolvable |
    MessageCommandChannelOptionResolvable |
    MessageCommandRoleOptionResolvable
export type AnyCommandModule = SlashCommandModule | ContextMenuCommandModule | MessageCommandModule
export type AnyCommandModuleData = SlashCommandModuleData | ContextMenuCommandModuleData | MessageCommandModuleData
export type AnyCommandModuleResolvable = SlashCommandModuleResolvable | ContextMenuCommandModuleResolvable | MessageCommandModuleResolvable
export type AnyVortexusModule = AnyCommandModule // add more later
export type AnyVortexusModuleData = AnyCommandModuleData // add more later
export type AnyVortexusModuleResolvable =AnyCommandModuleResolvable // add more later
export type AnyCooldownData = NormalCooldownData | SubcommandGroupCooldownData | SubcommandCooldownData
export type AnyCooldown = NormalCooldown | SubcommandGroupCooldown | SubcommandCooldown