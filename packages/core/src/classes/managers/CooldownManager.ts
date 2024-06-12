import { VortexusClient } from "../structures/VortexusClient.js";
import { CooldownData, Cooldown } from "../structures/Cooldown.js";
import { CacheManager } from "./CacheManager.js";

export interface CooldownCacheSweeperOptions {
    sweepFrequencyMs: number;
    filter?: (cooldown: Cooldown) => boolean;
}

export class CooldownManager extends CacheManager<Cooldown> {
    private _sweeper?: NodeJS.Timeout;

    constructor(readonly client: VortexusClient, options?: CooldownCacheSweeperOptions) {
        super()
        if (options) {
            this.setCooldownCacheSweeper(options)
        }
    }

    public create(data: CooldownData): Cooldown {
        const cooldown = new Cooldown(data, this)
        this._cache.set(cooldown.id, cooldown)
        return cooldown
    }

    public find(id: string): Cooldown | undefined
    public find(data: Partial<Omit<CooldownData, 'endsAt'>>): Cooldown | undefined
    public find(resolvable: string | Partial<Omit<CooldownData, 'endsAt'>>): Cooldown | undefined {
        if (typeof resolvable === "string") {
            return this.cache.get(resolvable)
        }
        return this.cache.find(cooldown => {
            if (resolvable.userId && resolvable.userId !== cooldown.userId) return false;
            if (resolvable.guildId && resolvable.guildId !== cooldown.guildId) return false;
            if (resolvable.channelId && resolvable.channelId !== cooldown.channelId) return false;
            if (resolvable.commandName && resolvable.commandName !== cooldown.commandName) return false;
            if (cooldown.hasEnded()) return false

            return true
        })
    }

    public setCooldownCacheSweeper(options: CooldownCacheSweeperOptions): NodeJS.Timeout {
        if (this._sweeper) clearInterval(this._sweeper);

        return this._sweeper = setInterval(() => this.sweepCache(options), options.sweepFrequencyMs).unref()
    }

    public sweepCache(options?: Omit<CooldownCacheSweeperOptions, "sweepFrequencyMs">): void {
        this._cache.sweep(cooldown => cooldown.hasEnded() || (!options?.filter || options.filter(cooldown)))
    }

    public toJSON(): CooldownData[] {
        return this.cache.map(cooldown => cooldown.toJSON());
    }
}