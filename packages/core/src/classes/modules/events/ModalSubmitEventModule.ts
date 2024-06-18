import { Awaitable, ModalSubmitInteraction } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseInteractionEventModuleData, BaseInteractionEventModule } from "./BaseInteractionEventModule.js";

export interface ModalSubmitEventModuleData extends BaseInteractionEventModuleData {
    interaction_type: EventInteractionType.ModalSubmit;
    execute: (interaction: ModalSubmitInteraction) => Awaitable<void>;
    customId: string
}

export abstract class ModalSubmitEventModule extends BaseInteractionEventModule implements ModalSubmitEventModuleData {
    public readonly interaction_type: EventInteractionType.ModalSubmit = EventInteractionType.ModalSubmit;
    public abstract execute: (interaction: ModalSubmitInteraction) => Awaitable<void>;
    public abstract customId: string;

    public toJSON(): Omit<ModalSubmitEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.ModalSubmit } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
            customId: this.customId
        }
    }
}