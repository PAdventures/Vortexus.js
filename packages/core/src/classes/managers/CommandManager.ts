import { Collection, ContextMenuCommandBuilder, normalizeArray, RestOrArray, SlashCommandBuilder, ApplicationCommandDataResolvable } from "discord.js";
import { MessageCommandBuilder } from "../builders/MessageCommandBuilder.js";
import { VortexusClient } from "../structures/VortexusClient.js";
import { CommandType } from "../../types/constants.js";
import { AnyCommandBuilder } from "../../types/structures.js";
import { CacheManager } from "./CacheManager.js";

export interface RegisterApplicationCommandOptions {
    global?: ApplicationCommandDataResolvable[];
    guilds?: { guildId: string, applicationCommands: ApplicationCommandDataResolvable[] }[]
}

export class CommandManager extends CacheManager<AnyCommandBuilder> {
    readonly slash_commands: Collection<string, SlashCommandBuilder> = this._cache.filter(builder => builder instanceof SlashCommandBuilder) as Collection<string, SlashCommandBuilder>;
    readonly context_menu_commands: Collection<string, ContextMenuCommandBuilder> = this._cache.filter(builder => builder instanceof ContextMenuCommandBuilder) as Collection<string, ContextMenuCommandBuilder>;
    readonly message_commands: Collection<string, MessageCommandBuilder> = this._cache.filter(builder => builder instanceof MessageCommandBuilder) as Collection<string, MessageCommandBuilder>;

    constructor(readonly client: VortexusClient<true>) {
        super()
    }

    public get size(): number {
        return this.slash_commands.size + this.context_menu_commands.size + this.message_commands.size
    }

    public get ApplicationCommands(): (SlashCommandBuilder | ContextMenuCommandBuilder)[] {
        return [
            ...this.slash_commands.values(),
            ...this.context_menu_commands.values()
        ]
    }

    public async registerApplicationCommands(options: RegisterApplicationCommandOptions) {
        if (options.global && options.global.length > 0) {
            this.client.application.commands.set(options.global)
        }
        if (options.guilds) {
            for (const { guildId, applicationCommands } of options.guilds) {
                if (applicationCommands.length > 0) {
                    this.client.application.commands.set(applicationCommands, guildId)
                }
            }
        }
    }

    public add(...commands: RestOrArray<AnyCommandBuilder>): AnyCommandBuilder[] {
        commands = normalizeArray(commands)

        for (const command of commands) {
            if (command instanceof SlashCommandBuilder) {
                this.slash_commands.set(command.name, command)
            }
            if (command instanceof ContextMenuCommandBuilder) {
                this.context_menu_commands.set(command.name, command)
            }
            if (command instanceof MessageCommandBuilder) {
                this.message_commands.set(command.name, command)
            }
        }

        return commands
    }

    public getNameByAlias(alias: string): string | undefined {
        return this.message_commands.find(command => command.aliases?.includes(alias))?.name
    }

    public get(command: string, command_type: CommandType.SlashCommand): SlashCommandBuilder | undefined
    public get(command: string, command_type: CommandType.ContextMenuCommand): ContextMenuCommandBuilder | undefined
    public get(command: string, command_type: CommandType.MessageCommand): MessageCommandBuilder | undefined
    public get(command: string, command_type: CommandType): AnyCommandBuilder | undefined {
        if (command_type === CommandType.MessageCommand) {
            return this.message_commands.get(command)
        }
        if (command_type === CommandType.SlashCommand) {
            return this.slash_commands.get(command)
        }
        if (command_type === CommandType.ContextMenuCommand) {
            return this.context_menu_commands.get(command)
        }
    }
}