import { generateId } from "@vortexus.js/utility"
import { ModuleType } from "../../types/constants.js";
import { CommandModule } from "./commands/CommandModule.js";
import { BaseEventModule } from "./events/BaseEventModule.js";
import { AnyCommandModule, AnyEventModule } from "../../types/structures.js";

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

    public isEventModule(): this is AnyEventModule {
        return this.module_type === ModuleType.Event;
    }

    protected _toJSON(): BaseModuleData {
        return {
            id: this.id,
            versions: this.versions,
            module_type: this.module_type
        }
    }
}
