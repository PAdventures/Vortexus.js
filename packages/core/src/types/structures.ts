import { ContextMenuCommandBuilder, JSONEncodable, SlashCommandBuilder } from "discord.js";
import { MessageCommandStringOptionBuilderData, MessageCommandIntegerOptionBuilderData, MessageCommandNumberOptionBuilderData, MessageCommandBooleanOptionBuilderData, MessageCommandUserOptionBuilderData, MessageCommandChannelOptionBuilderData, MessageCommandRoleOptionBuilderData } from "../interfaces/builders/MessageCommandOptionBuilders.js";
import { MessageCommandBooleanOptionBuilder, MessageCommandChannelOptionBuilder, MessageCommandIntegerOptionBuilder, MessageCommandNumberOptionBuilder, MessageCommandRoleOptionBuilder, MessageCommandStringOptionBuilder, MessageCommandUserOptionBuilder } from "../classes/builders/MessageCommandOptionBuilders.js";
import { MessageCommandBuilder } from "../classes/builders/MessageCommandBuilder.js";
<<<<<<< Updated upstream
import { CommandType } from "./constants.js";
import { VortexusClient } from "../classes/structures/VortexusClient.js";
import { MessageCommandBooleanOptionBuilder, MessageCommandBooleanOptionBuilderData, MessageCommandChannelOptionBuilder, MessageCommandChannelOptionBuilderData, MessageCommandIntegerOptionBuilder, MessageCommandIntegerOptionBuilderData, MessageCommandNumberOptionBuilder, MessageCommandNumberOptionBuilderData, MessageCommandRoleOptionBuilder, MessageCommandRoleOptionBuilderData, MessageCommandStringOptionBuilder, MessageCommandStringOptionBuilderData, MessageCommandUserOptionBuilder, MessageCommandUserOptionBuilderData } from "../classes/builders/MessageCommandOptionBuilders.js";
import { SlashCommandModule, SlashCommandModuleData } from "../classes/modules/commands/SlashCommandModule.js";
import { ContextMenuCommandModule, ContextMenuCommandModuleData } from '../classes/modules/commands/ContextMenuCommandModule.js';
import { MessageCommandModule, MessageCommandModuleData } from "../classes/modules/commands/MessageCommandModule.js";
import { CooldownCacheSweeperOptions } from "../classes/managers/CooldownManager.js";
import { Precondition, PreconditionData } from "../classes/structures/Precondition.js";
import { InteractionEventModule, InteractionEventModuleData } from "../classes/modules/events/InteractionEventModule.js";
import { AutocompleteEventModule, AutocompleteEventModuleData } from "../classes/modules/events/AutocompleteEventModule.js";
import { ButtonEventModule, ButtonEventModuleData } from "../classes/modules/events/ButtonEventModule.js";
import { ModalSubmitEventModule, ModalSubmitEventModuleData } from "../classes/modules/events/ModalSubmitEventModule.js";
import { SelectMenuEventModule, SelectMenuEventModuleData } from "../classes/modules/events/SelectMenuEventModule.js";

// Client Config

export interface VortexusClientConfig {
    token: string;
    client: ClientOptions;
    cooldowns?: VortexusClientConfigCooldownOptions;
    commands?: VortexusClientConfigCommandOptions
}

export interface VortexusClientConfigCooldownOptions {
    enable: boolean;
    default_ms?: number;
    sweeper: CooldownCacheSweeperOptions
}

export interface VortexusClientConfigCommandOptions {
    register?: {
        globally?: boolean
        guilds?: string[]
    },
    message_commands?: {
        prefix?: string;
        arg_separator?: string
    }
}

// Builder interfaces and types

export interface SlashCommandExecuteData<Cached extends CacheType = CacheType> {
    type: CommandType.SlashCommand;
    builder: SlashCommandBuilder;
    interaction: ChatInputCommandInteraction<Cached>;
    client: VortexusClient<true>;
    module: SlashCommandModule;
}

export interface ContextMenuCommandExecuteData<Cached extends CacheType = CacheType> {
    type: CommandType.ContextMenuCommand;
    builder: ContextMenuCommandBuilder;
    interaction: ContextMenuCommandInteraction<Cached>;
    client: VortexusClient<true>;
    module: ContextMenuCommandModule;
}

export interface MessageCommandExecuteData<InGuild extends boolean = boolean> {
    type: CommandType.MessageCommand;
    builder: MessageCommandBuilder;
    message: Message<InGuild>;
    client: VortexusClient<true>;
    module: MessageCommandModule;
}

export type SlashCommandExecuteFunction = (slashCommandExecuteData: SlashCommandExecuteData) => Awaitable<void>;
export type ContextMenuCommandExecuteFunction = (contextMenuCommandExecuteData: ContextMenuCommandExecuteData) => Awaitable<void>;
export type MessageCommandExecuteFunction = (messageCommandExecuteData: MessageCommandExecuteData) => Awaitable<void>;

export type SlashCommandModuleResolvable = SlashCommandModuleData | JSONEncodable<SlashCommandModuleData>;
export type ContextMenuCommandModuleResolvable = ContextMenuCommandModuleData | JSONEncodable<ContextMenuCommandModuleData>;
export type MessageCommandModuleResolvable = MessageCommandModuleData | JSONEncodable<MessageCommandModuleData>;
=======
>>>>>>> Stashed changes

export type MessageCommandStringOptionResolvable = MessageCommandStringOptionBuilderData | JSONEncodable<MessageCommandStringOptionBuilderData>;
export type MessageCommandIntegerOptionResolvable = MessageCommandIntegerOptionBuilderData | JSONEncodable<MessageCommandIntegerOptionBuilderData>;
export type MessageCommandNumberOptionResolvable = MessageCommandNumberOptionBuilderData | JSONEncodable<MessageCommandNumberOptionBuilderData>;
export type MessageCommandBooleanOptionResolvable = MessageCommandBooleanOptionBuilderData | JSONEncodable<MessageCommandBooleanOptionBuilderData>;
export type MessageCommandUserOptionResolvable = MessageCommandUserOptionBuilderData | JSONEncodable<MessageCommandUserOptionBuilderData>;
export type MessageCommandChannelOptionResolvable = MessageCommandChannelOptionBuilderData | JSONEncodable<MessageCommandChannelOptionBuilderData>;
export type MessageCommandRoleOptionResolvable = MessageCommandRoleOptionBuilderData | JSONEncodable<MessageCommandRoleOptionBuilderData>;

export type AnyMessageCommandOptionBuilder = MessageCommandStringOptionBuilder |
    MessageCommandIntegerOptionBuilder |
    MessageCommandNumberOptionBuilder |
    MessageCommandBooleanOptionBuilder |
    MessageCommandUserOptionBuilder |
    MessageCommandChannelOptionBuilder |
    MessageCommandRoleOptionBuilder

export type AnyMessageCommandOptionBuilderData = MessageCommandStringOptionBuilderData |
<<<<<<< Updated upstream
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
export type AnyEventModule = InteractionEventModule | AutocompleteEventModule | ButtonEventModule | ModalSubmitEventModule | SelectMenuEventModule
export type AnyEventModuleData = InteractionEventModuleData | AutocompleteEventModuleData | ButtonEventModuleData | ModalSubmitEventModuleData | SelectMenuEventModuleData
export type AnyPreconditionExecuteFunction = SlashCommandPreconditionExecuteFunction | ContextMenuCommandPreconditionExecuteFunction | MessageCommandPreconditionExecuteFunction
export type AnyVortexusModule = AnyCommandModule | AnyEventModule
export type AnyVortexusModuleData = AnyCommandModuleData | AnyEventModuleData
=======
MessageCommandIntegerOptionBuilderData |
MessageCommandNumberOptionBuilderData |
MessageCommandBooleanOptionBuilderData |
MessageCommandUserOptionBuilderData |
MessageCommandChannelOptionBuilderData |
MessageCommandRoleOptionBuilderData

export type AnyCommandBuilder = SlashCommandBuilder | ContextMenuCommandBuilder | MessageCommandBuilder
export type AnyCommandBuilderData = SlashCommandBuilder | ContextMenuCommandBuilder
>>>>>>> Stashed changes
