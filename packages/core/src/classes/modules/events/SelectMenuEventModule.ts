import { AnySelectMenuInteraction, Awaitable } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseInteractionEventModuleData, BaseInteractionEventModule } from "./BaseInteractionEventModule.js";

export interface SelectMenuEventModuleData extends BaseInteractionEventModuleData {
    interaction_type: EventInteractionType.SelectMenu;
    execute: (interaction: AnySelectMenuInteraction) => Awaitable<void>;
    customId: string;
}

export abstract class SelectMenuEventModule extends BaseInteractionEventModule implements SelectMenuEventModuleData {
    public readonly interaction_type: EventInteractionType.SelectMenu = EventInteractionType.SelectMenu;
    public abstract execute: (interaction: AnySelectMenuInteraction) => Awaitable<void>;
    public abstract customId: string;

    public toJSON(): Omit<SelectMenuEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.SelectMenu } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
            customId: this.customId,
        }
    }
}