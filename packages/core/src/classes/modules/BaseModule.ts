import { generateId } from "@vortexus.js/utility"
import { ModuleType } from "../../types/constants.js";
import { AnyCommandModule, AnyInteractionEventModule } from "../../types/structures.js";
import { EventModule } from "./events/EventModule.js";

export interface BaseModuleData {
    id: string;
    versions: string | string[];
    module_type: ModuleType
}

export abstract class BaseModule implements BaseModuleData {
    public readonly id: string = generateId();
    public abstract versions: string | string[];
    public abstract readonly module_type: ModuleType;

    public isCommandModule(): this is AnyCommandModule {
        return this.module_type === ModuleType.Command;
    }

    public isEventModule(): this is EventModule {
        return this.module_type === ModuleType.Event;
    }

    public isInteractionEventModule(): this is AnyInteractionEventModule {
        return this.module_type === ModuleType.InteractionEvent
    }

    protected _toJSON(): BaseModuleData {
        return {
            id: this.id,
            versions: this.versions,
            module_type: this.module_type
        }
    }
}
