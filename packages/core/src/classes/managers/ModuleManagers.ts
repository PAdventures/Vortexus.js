import { Collection, ReadonlyCollection } from "discord.js";
import { AnyCommandModule, AnyCommandModuleData, AnyEventModule, AnyEventModuleData, AnyVortexusModule, AnyVortexusModuleData } from "../../types/structures.js";
import { VortexusClient } from "../structures/VortexusClient.js";
import { ModuleType } from "../../types/constants.js";

export class ModuleManager {
    private _command_modules: Collection<string, AnyCommandModule> = new Collection();
    private _event_modules: Collection<string, AnyEventModule> = new Collection();

    public get command_modules(): ReadonlyCollection<string, AnyCommandModule> {
        return this._command_modules as ReadonlyCollection<string, AnyCommandModule>
    }

    public get event_modules(): ReadonlyCollection<string, AnyEventModule> {
        return this._event_modules as ReadonlyCollection<string, AnyEventModule>
    }

    constructor(readonly client: VortexusClient) {}

    public cacheModules(modules?: AnyVortexusModule[]): void {
        if (modules && modules.length > 0) {
            for (const module of modules) {
                if (module.isCommandModule()) {
                    this._command_modules.set(module.id, module)
                }
                if (module.isEventModule()) {
                    this._event_modules.set(module.id, module)
                }
            }
            return;
        }
    }

    public find(id: string): AnyVortexusModule | undefined
    public find(module: AnyCommandModuleData): AnyCommandModule | undefined
    public find(module: AnyEventModuleData): AnyEventModule | undefined
    public find(resolvable: string | AnyVortexusModuleData): AnyVortexusModule | undefined {
        if (typeof resolvable === "string") {
            const cmdModule = this._command_modules.get(resolvable);
            if (!cmdModule) {
                return this._event_modules.get(resolvable)
            }
            return cmdModule
        }
        return resolvable.module_type === ModuleType.Command ? this._command_modules.get(resolvable.id) : this._event_modules.get(resolvable.id)
    }

    public toJSON(): AnyVortexusModuleData[] {
        return [
            ...this._command_modules.map(m => m.toJSON()),
            ...this._event_modules.map(m => m.toJSON())
        ]
    }
}