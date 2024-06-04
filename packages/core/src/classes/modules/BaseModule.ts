import { ModuleType } from "../../types/constants.js";
import { CommandModule } from "./CommandModule.js";

export interface BaseModuleData {
    id: string;
    versions: string | string[];
}

export abstract class BaseModule implements BaseModuleData {
    public abstract id: string;
    public abstract versions: string | string[];
    public abstract readonly module_type: ModuleType;

    public isCommandModule(): this is CommandModule {
        return this.module_type === ModuleType.CommandModule
    }
}
