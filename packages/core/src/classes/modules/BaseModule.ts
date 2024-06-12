import { generateId } from "@vortexus.js/utility"

export interface BaseModuleData {
    id: string;
    versions: string | string[];
}

export abstract class BaseModule implements BaseModuleData {
    public readonly id: string = generateId();
    public abstract versions: string | string[];

    protected toJSON(): BaseModuleData {
        return {
            id: this.id,
            versions: this.versions,
        }
    }
}
