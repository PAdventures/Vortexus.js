import { Collection, ReadonlyCollection } from "discord.js";

export abstract class CacheManager<T> {
    protected _cache: Collection<string, T> = new Collection();

    public get cache(): ReadonlyCollection<string, T> {
        return this._cache as ReadonlyCollection<string, T>
    }
}