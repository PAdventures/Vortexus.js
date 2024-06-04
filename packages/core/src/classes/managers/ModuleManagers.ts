import { AnyVortexusModule } from "../../types/structures.js";
import { CacheManager } from "./CacheManager.js";

export interface ModuleManager extends CacheManager<AnyVortexusModule> {}

export abstract class ModuleManager extends CacheManager<AnyVortexusModule>  {
    public cacheModules(modules?: AnyVortexusModule[]): void {
        for (const module of modules ?? this.cache.values()) {
            this._cache.set(module.id, module)
        }
    }

    public toJSON() {
        return this.cache.map(m => m)
    }
}