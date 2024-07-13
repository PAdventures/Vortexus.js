import { Awaitable, Interaction } from "discord.js";
import { BaseEventModule, BaseEventModuleData } from "./BaseEventModule.js";
import { EventInteractionType } from "../../../types/constants.js";

export interface InteractionEventModuleData extends BaseEventModuleData {
    interaction_type: EventInteractionType.InteractionCreate;
    execute: (interaction: Interaction) => Awaitable<void>;
}

export abstract class InteractionEventModule extends BaseEventModule implements InteractionEventModuleData {
    public readonly interaction_type: EventInteractionType.InteractionCreate = EventInteractionType.InteractionCreate;
    public abstract execute: (interaction: Interaction) => Awaitable<void>;

    public toJSON(): Omit<InteractionEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.InteractionCreate } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
        }
    }
}