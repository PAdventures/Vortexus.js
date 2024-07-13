import { AutocompleteInteraction, Awaitable } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseEventModule, BaseEventModuleData } from "./BaseEventModule.js";

export interface AutocompleteEventModuleData extends BaseEventModuleData {
    interaction_type: EventInteractionType.AutoComplete;
    execute: (interaction: AutocompleteInteraction) => Awaitable<void>;
}

export abstract class AutocompleteEventModule extends BaseEventModule implements AutocompleteEventModuleData {
    public abstract readonly customId: string;
    public readonly interaction_type: EventInteractionType.AutoComplete = EventInteractionType.AutoComplete;
    public abstract execute: (interaction: AutocompleteInteraction) => Awaitable<void>;
    public cooldown?: number | undefined;

    public toJSON(): Omit<AutocompleteEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.AutoComplete } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
        }
    }
}