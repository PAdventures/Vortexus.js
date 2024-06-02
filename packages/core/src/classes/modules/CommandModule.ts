import { PermissionResolvable } from "discord.js";
import { CommandType } from "../../types/constants.js";
import { AnyCommandBuilder, AnyCommandExecuteFunction } from "../../types/structures.js";

export interface CommandModuleData {
    command_type: CommandType;
    data: AnyCommandBuilder;
    required_bot_permission?: PermissionResolvable;
    required_member_permissions?: PermissionResolvable;
    cooldown?: number;
    execute: AnyCommandExecuteFunction
}

export abstract class CommandModule implements CommandModuleData {
    public abstract readonly command_type: CommandType;
    public abstract data: AnyCommandBuilder;
    public required_bot_permission?: PermissionResolvable;
    public required_member_permissions?: PermissionResolvable;
    public cooldown?: number;
    public abstract execute: AnyCommandExecuteFunction;
}