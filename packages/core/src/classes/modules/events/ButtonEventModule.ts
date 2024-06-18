import { Awaitable, ButtonInteraction } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseInteractionEventModuleData, BaseInteractionEventModule } from "./BaseInteractionEventModule.js";

export interface ButtonEventModuleData extends BaseInteractionEventModuleData {
    interaction_type: EventInteractionType.Button;
    execute: (interaction: ButtonInteraction) => Awaitable<void>;
    customId: string;
}

export abstract class ButtonEventModule extends BaseInteractionEventModule implements ButtonEventModuleData {
    public readonly interaction_type: EventInteractionType.Button = EventInteractionType.Button;
    public abstract execute: (interaction: ButtonInteraction) => Awaitable<void>;
    public abstract customId: string;

    public toJSON(): Omit<ButtonEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.Button } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
            customId: this.customId,
        }
    }
}