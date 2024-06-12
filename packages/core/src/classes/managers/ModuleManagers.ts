import { AnyCommandModule, AnyCommandModuleData } from "../../types/structures.js";
import { ContextMenuCommandModule, ContextMenuCommandModuleData } from "../modules/ContextMenuCommandModule.js";
import { MessageCommandModule, MessageCommandModuleData } from "../modules/MessageCommandModule.js";
import { SlashCommandModule, SlashCommandModuleData } from "../modules/SlashCommandModule.js";
import { VortexusClient } from "../structures/VortexusClient.js";
import { CacheManager } from "./CacheManager.js";

export class ModuleManager extends CacheManager<AnyCommandModule> {
    constructor(readonly client: VortexusClient) {
        super()
    }

    public cacheModules(modules?: AnyCommandModule[]): void {
        for (const module of modules ?? this.cache.values()) {
            this._cache.set(module.id, module)
        }
    }

    public find(id: string): AnyCommandModuleData | undefined
    public find(module: SlashCommandModuleData): SlashCommandModule | undefined
    public find(module: ContextMenuCommandModuleData): ContextMenuCommandModule | undefined
    public find(module: MessageCommandModuleData): MessageCommandModule | undefined
    public find(resolvable: string | AnyCommandModuleData): AnyCommandModule | undefined {
        if (typeof resolvable === "string") {
            return this._cache.get(resolvable);
        }
        return this._cache.get(resolvable.id)
    }

    public toJSON(): AnyCommandModule[] {
        return this.cache.map(m => m)
    }
}