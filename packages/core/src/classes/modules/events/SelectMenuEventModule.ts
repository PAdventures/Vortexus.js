import { Awaitable, AnySelectMenuInteraction } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseEventModule, BaseEventModuleData } from "./BaseEventModule.js";

export interface SelectMenuEventModuleData extends BaseEventModuleData {
    interaction_type: EventInteractionType.SelectMenu;
    execute: (interaction: AnySelectMenuInteraction) => Awaitable<void>;
    customId: string;
    cooldown?: number;
}

export abstract class SelectMenuEventModule extends BaseEventModule implements SelectMenuEventModuleData {
    public abstract readonly customId: string;
    public readonly interaction_type: EventInteractionType.SelectMenu = EventInteractionType.SelectMenu;
    public abstract execute: (interaction: AnySelectMenuInteraction) => Awaitable<void>;
    public cooldown?: number | undefined;

    public toJSON(): Omit<SelectMenuEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.SelectMenu } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
            customId: this.customId,
            cooldown: this.cooldown
        }
    }
}