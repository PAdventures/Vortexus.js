import { PermissionResolvable } from "discord.js";
import { EventInteractionType, ModuleType } from "../../../types/constants.js";
import { BaseModule, BaseModuleData } from "../BaseModule.js";

export interface BaseInteractionEventModuleData extends BaseModuleData {
    interaction_type: EventInteractionType;
    cooldown?: number;
    required_client_permissions?: PermissionResolvable;
    required_member_permissions?: PermissionResolvable;
}

export abstract class BaseInteractionEventModule extends BaseModule implements BaseInteractionEventModuleData {
    public module_type: ModuleType.InteractionEvent = ModuleType.InteractionEvent;
    public abstract readonly interaction_type: EventInteractionType;
    public cooldown?: number;
    public required_client_permissions?: PermissionResolvable;
    public required_member_permissions?: PermissionResolvable;

    protected _toJSON(): BaseInteractionEventModuleData {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            cooldown: this.cooldown,
            required_client_permissions: this.required_client_permissions,
            required_member_permissions: this.required_member_permissions,
        }
    }
}