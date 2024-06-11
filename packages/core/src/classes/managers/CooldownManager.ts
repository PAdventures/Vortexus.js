import { VortexusClient } from "../structures/VortexusClient.js";
import { NormalCooldown, SubcommandGroupCooldown, SubcommandCooldown, NormalCooldownData, SubcommandGroupCooldownData, SubcommandCooldownData } from "../structures/Cooldowns.js";
import { CacheManager } from "./CacheManager.js";
import { AnyCooldown, AnyCooldownData } from "../../types/structures.js";
import { Collection } from "discord.js";
import { CooldownType } from "../../types/constants.js";

export interface CooldownCacheSweeperOptions {
    sweepFrequencyMs: number;
    filter?: (cooldown: AnyCooldown) => boolean;
}

export class CooldownManager extends CacheManager<AnyCooldown> {
    private _sweeper?: NodeJS.Timeout;

    public get normalCooldowns(): Collection<string, NormalCooldown> {
        return this.cache.filter(cooldown => cooldown.isNormalCooldown()) as Collection<string, NormalCooldown>
    }

    public get subcommandGroupCooldowns(): Collection<string, SubcommandGroupCooldown> {
        return this.cache.filter(cooldown => cooldown.isSubcommandGroupCooldown()) as Collection<string, SubcommandGroupCooldown>
    }

    public get subcommandCooldowns(): Collection<string, SubcommandCooldown> {
        return this.cache.filter(cooldown => cooldown.isSubcommandCooldown()) as Collection<string, SubcommandCooldown>
    }

    constructor(readonly client: VortexusClient, options?: CooldownCacheSweeperOptions) {
        super()
        if (options) {
            this.setCooldownCacheSweeper(options)
        }
    }

    public create(data: NormalCooldownData): NormalCooldown
    public create(data: SubcommandCooldownData): SubcommandCooldown
    public create(data: SubcommandGroupCooldownData): SubcommandGroupCooldown
    public create(data: AnyCooldownData): AnyCooldown {
        let cooldown: AnyCooldown;
        switch (data.cooldown_type) {
            case CooldownType.Normal: {
                const doesExists = this.find(data)
                cooldown = doesExists ? doesExists : new NormalCooldown(data, this)
                break
            }
            case CooldownType.Subcommand: {
                const doesExist = this.find(data)
                cooldown = doesExist ? doesExist : new SubcommandCooldown(data, this)
                break
            }
            case CooldownType.SubcommandGroup: {
                const doesExists = this.find(data)
                cooldown = doesExists ? doesExists : new SubcommandGroupCooldown(data, this)
                break
            }
        }
        this._cache.set(cooldown.id, cooldown)
        return cooldown
    }

    public find(data: Partial<Omit<NormalCooldownData, 'endsAt'>>): NormalCooldown | undefined
    public find(data: Partial<Omit<SubcommandCooldownData, 'endsAt'>>): SubcommandCooldown | undefined
    public find(data: Partial<Omit<SubcommandGroupCooldownData, 'endsAt'>>): SubcommandGroupCooldown | undefined
    public find(data: Partial<Omit<AnyCooldownData, 'endsAt'>>): AnyCooldown | undefined {
        switch (data.cooldown_type) {
            case CooldownType.Normal: {
                return this.findNormal(data as Partial<Omit<NormalCooldownData, 'endsAt'>>)
            }
            case CooldownType.Subcommand: {
                return this.findSubcommand(data as Partial<Omit<SubcommandCooldownData, 'endsAt'>>)
            }
            case CooldownType.SubcommandGroup: {
                return this.findSubcommandGroup(data as Partial<Omit<SubcommandGroupCooldownData, 'endsAt'>>)
            }
        }
    }

    private findNormal(data: Partial<Omit<NormalCooldownData, 'endsAt'>>): NormalCooldown | undefined {
        return this.normalCooldowns.find(cooldown => {
            if (data.userId && data.userId !== cooldown.userId) return false;
            if (data.guildId && data.guildId !== cooldown.guildId) return false;
            if (data.channelId && data.channelId !== cooldown.channelId) return false;
            if (data.commandName && data.commandName !== cooldown.commandName) return false;

            if (cooldown.hasEnded()) {
                this._cache.delete(cooldown.id)
                return false
            }

            return true
        })
    }

    private findSubcommand(data: Partial<Omit<SubcommandCooldownData, 'endsAt'>>): SubcommandCooldown | undefined {
        return this.subcommandCooldowns.find(cooldown => {
            if (data.userId && data.userId !== cooldown.userId) return false;
            if (data.guildId && data.guildId !== cooldown.guildId) return false;
            if (data.channelId && data.channelId !== cooldown.channelId) return false;
            if (data.commandName && data.commandName !== cooldown.commandName) return false;
            if (data.commandSubcommandName && data.commandSubcommandName !== cooldown.commandSubcommandName) return false;

            if (cooldown.hasEnded()) {
                this._cache.delete(cooldown.id)
                return false
            }

            return true
        })
    }

    private findSubcommandGroup(data: Partial<Omit<SubcommandGroupCooldownData, 'endsAt'>>): SubcommandGroupCooldown | undefined {
        return this.subcommandGroupCooldowns.find(cooldown => {
            if (data.userId && data.userId !== cooldown.userId) return false;
            if (data.guildId && data.guildId !== cooldown.guildId) return false;
            if (data.channelId && data.channelId !== cooldown.channelId) return false;
            if (data.commandName && data.commandName !== cooldown.commandName) return false;
            if (data.commandSubcommandGroupName && data.commandSubcommandGroupName !== cooldown.commandSubcommandGroupName) return false;

            if (cooldown.hasEnded()) {
                this._cache.delete(cooldown.id)
                return false
            }

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

    public toJSON(): AnyCooldownData[] {
        return this.cache.map(cooldown => cooldown.toJSON());
    }
}