import { AutocompleteInteraction, Awaitable } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseInteractionEventModuleData, BaseInteractionEventModule } from "./BaseInteractionEventModule.js";

export interface AutocompleteEventModuleData extends BaseInteractionEventModuleData {
    interaction_type: EventInteractionType.AutoComplete;
    execute: (interaction: AutocompleteInteraction) => Awaitable<void>;
}

export abstract class AutocompleteEventModule extends BaseInteractionEventModule implements AutocompleteEventModuleData {
    public readonly interaction_type: EventInteractionType.AutoComplete = EventInteractionType.AutoComplete;
    public abstract execute: (interaction: AutocompleteInteraction) => Awaitable<void>;

    public toJSON(): Omit<AutocompleteEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.AutoComplete } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
        }
    }
}