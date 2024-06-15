import { PermissionResolvable, RESTPostAPIChatInputApplicationCommandsJSONBody, RESTPostAPIContextMenuApplicationCommandsJSONBody } from "discord.js";
import { CommandType, ModuleType } from "../../../types/constants.js";
import { AnyCommandBuilder, AnyCommandExecuteFunction, AnyCommandModuleData, PreconditionResolvable } from "../../../types/structures.js";
import { BaseModule, BaseModuleData } from "../BaseModule.js";
import { SlashCommandModule } from "./SlashCommandModule.js";
import { ContextMenuCommandModule } from './ContextMenuCommandModule.js';
import { MessageCommandModule } from "./MessageCommandModule.js";
import { MessageCommandBuilderData } from "../../builders/MessageCommandBuilder.js";

export interface CommandModuleData extends BaseModuleData {
    command_type: CommandType;
    data: AnyCommandBuilder
    required_bot_permission?: PermissionResolvable;
    required_member_permissions?: PermissionResolvable;
    cooldown?: number;
    execute: AnyCommandExecuteFunction;
    preconditions?: PreconditionResolvable[];
}

export abstract class CommandModule extends BaseModule implements CommandModuleData {
    public readonly module_type: ModuleType.Command = ModuleType.Command;
    public abstract readonly command_type: CommandType;
    public abstract data: AnyCommandBuilder;
    public required_bot_permission?: PermissionResolvable;
    public required_member_permissions?: PermissionResolvable;
    public cooldown?: number;
    public abstract execute: AnyCommandExecuteFunction;
    public preconditions?: PreconditionResolvable[];

    public isSlashCommandModule(): this is SlashCommandModule {
        return this.command_type === CommandType.SlashCommand
    }

    public isContextMenuCommand(): this is ContextMenuCommandModule {
        return this.command_type === CommandType.ContextMenuCommand
    }

    public isMessageCommand(): this is MessageCommandModule {
        return this.command_type === CommandType.MessageCommand
    }

    public toJSON(): Omit<AnyCommandModuleData, "command_type" | "data"> & { command_type: CommandType, data: RESTPostAPIChatInputApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody | MessageCommandBuilderData } {
        return {
            ...super._toJSON(),
            command_type: this.command_type,
            data: this.data.toJSON(),
            cooldown: this.cooldown,
            required_bot_permission: this.required_bot_permission,
            required_member_permissions: this.required_member_permissions,
            execute: this.execute
        }
    }
}