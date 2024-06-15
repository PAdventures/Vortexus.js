import { EventInteractionType } from "../../../types/constants.js";
import { BaseModule, BaseModuleData } from "../BaseModule.js";
import { AutocompleteEventModule } from "./AutocompleteEventModule.js";
import { ButtonEventModule } from "./ButtonEventModule.js";
import { InteractionEventModule } from "./InteractionEventModule.js";
import { ModalSubmitEventModule } from "./ModalSubmitEventModule.js";
import { SelectMenuEventModule } from "./SelectMenuEventModule.js";

export interface BaseEventModuleData extends BaseModuleData {
    interaction_type: EventInteractionType;
}

export abstract class BaseEventModule extends BaseModule implements BaseEventModule {
    public abstract readonly interaction_type: EventInteractionType;

    protected _toJSON(): BaseEventModuleData {
        return {
            ...super._toJSON(),
            interaction_type: this.interaction_type,
        }
    }

    public isInteractionEventModule(): this is InteractionEventModule {
        return this.interaction_type === EventInteractionType.InteractionCreate
    }

    public isAutocompleteEventModule(): this is AutocompleteEventModule {
        return this.interaction_type === EventInteractionType.AutoComplete
    }

    public isButtonEventModule(): this is ButtonEventModule {
        return this.interaction_type === EventInteractionType.Button
    }

    public isModalSubmitEventModule(): this is ModalSubmitEventModule {
        return this.interaction_type === EventInteractionType.ModalSubmit
    }

    public isSelectMenuEventModule(): this is SelectMenuEventModule {
        return this.interaction_type === EventInteractionType.SelectMenu
    }
}