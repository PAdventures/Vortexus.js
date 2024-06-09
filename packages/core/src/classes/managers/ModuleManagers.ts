import { AnyCommandModule, AnyVortexusModule, AnyVortexusModuleData } from "../../types/structures.js";
import { ContextMenuCommandModule, ContextMenuCommandModuleData } from "../modules/ContextMenuCommandModule.js";
import { MessageCommandModule, MessageCommandModuleData } from "../modules/MessageCommandModule.js";
import { SlashCommandModule, SlashCommandModuleData } from "../modules/SlashCommandModule.js";
import { VortexusClient } from "../structures/VortexusClient.js";
import { CacheManager } from "./CacheManager.js";

export class ModuleManager extends CacheManager<AnyVortexusModule> {
    constructor(readonly client: VortexusClient) {
        super()
    }

    public cacheModules(modules?: AnyVortexusModule[]): void {
        for (const module of modules ?? this.cache.values()) {
            this._cache.set(module.id, module)
        }
    }

    public find(id: string): AnyVortexusModule | undefined
    public find(module: SlashCommandModuleData): SlashCommandModule | undefined
    public find(module: ContextMenuCommandModuleData): ContextMenuCommandModule | undefined
    public find(module: MessageCommandModuleData): MessageCommandModule | undefined
    public find(resolvable: string | AnyVortexusModuleData): AnyVortexusModule | undefined {
        if (typeof resolvable === "string") {
            return this._cache.get(resolvable);
        }
        return this._cache.get(resolvable.id)
    }

    public toJSON(): AnyVortexusModule[] {
        return this.cache.map(m => m)
    }
}