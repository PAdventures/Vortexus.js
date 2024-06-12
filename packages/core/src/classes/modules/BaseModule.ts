import { ModuleType } from "../../types/constants.js";
import { CommandModule } from "./CommandModule.js";
import { generateId } from "@vortexus.js/utility"
import { PreconditionModule } from "./PreconditionModule.js";

export interface BaseModuleData {
    id: string;
    versions: string | string[];
    module_type: ModuleType;
}

export abstract class BaseModule implements BaseModuleData {
    public readonly id: string = generateId();
    public abstract versions: string | string[];
    public abstract readonly module_type: ModuleType;

    public isCommandModule(): this is CommandModule {
        return this.module_type === ModuleType.CommandModule
    }

    public isPreconditionModule(): this is PreconditionModule {
        return this.module_type === ModuleType.PreconditionModule
    }

    protected toJSON(): BaseModuleData {
        return {
            id: this.id,
            versions: this.versions,
            module_type: this.module_type
        }
    }
}
