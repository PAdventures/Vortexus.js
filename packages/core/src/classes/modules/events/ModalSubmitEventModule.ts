import { Awaitable, ModalSubmitInteraction } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseEventModule, BaseEventModuleData } from "./BaseEventModule.js";

export interface ModalSubmitEventModuleData extends BaseEventModuleData {
    interaction_type: EventInteractionType.ModalSubmit;
    execute: (interaction: ModalSubmitInteraction) => Awaitable<void>;
    customId: string;
    cooldown?: number;
}

export abstract class ModalSubmitEventModule extends BaseEventModule implements ModalSubmitEventModuleData {
    public abstract readonly customId: string;
    public readonly interaction_type: EventInteractionType.ModalSubmit = EventInteractionType.ModalSubmit;
    public abstract execute: (interaction: ModalSubmitInteraction) => Awaitable<void>;
    public cooldown?: number | undefined;

    public toJSON(): Omit<ModalSubmitEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.ModalSubmit } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
            customId: this.customId,
            cooldown: this.cooldown
        }
    }
}