import { Awaitable, ButtonInteraction } from "discord.js";
import { EventInteractionType } from "../../../types/constants.js";
import { BaseEventModule, BaseEventModuleData } from "./BaseEventModule.js";

export interface ButtonEventModuleData extends BaseEventModuleData {
    interaction_type: EventInteractionType.Button;
    execute: (interaction: ButtonInteraction) => Awaitable<void>;
    customId: string;
    cooldown?: number;
}

export abstract class ButtonEventModule extends BaseEventModule implements ButtonEventModuleData {
    public abstract readonly customId: string;
    public readonly interaction_type: EventInteractionType.Button = EventInteractionType.Button;
    public abstract execute: (interaction: ButtonInteraction) => Awaitable<void>;
    public cooldown?: number | undefined;

    public toJSON(): Omit<ButtonEventModuleData, 'interaction_type'> & { interaction_type: EventInteractionType.Button } {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
            execute: this.execute,
            customId: this.customId,
            cooldown: this.cooldown
        }
    }
}