import { Awaitable, Interaction } from 'discord.js';
import { BaseInteractionEventModuleData, BaseInteractionEventModule } from "./BaseInteractionEventModule.js";
import { EventInteractionType } from "../../../types/constants.js";

export interface InteractionCreateEventModuleData extends BaseInteractionEventModuleData {
    interaction_type: EventInteractionType.InteractionCreate;
    execute: (interaction: Interaction) => Awaitable<void>;
}

export abstract class InteractionCreateEventModule extends BaseInteractionEventModule implements InteractionCreateEventModuleData {
    public readonly interaction_type: EventInteractionType.InteractionCreate = EventInteractionType.InteractionCreate;
    public abstract execute: (interaction: Interaction) => Awaitable<void>;

    public toJSON(): Omit<InteractionCreateEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.InteractionCreate } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
        }
    }
}