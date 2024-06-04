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
        return this.cache.filter(cooldown => cooldown.isNormalCooldown())
    }

    public get subcommandGroupCooldowns(): Collection<string, SubcommandGroupCooldown> {
        return this.cache.filter(cooldown => cooldown.isSubcommandGroupCooldown())
    }

    public get subcommandCooldowns(): Collection<string, SubcommandCooldown> {
        return this.cache.filter(cooldown => cooldown.isSubcommandCooldown())
    }

    constructor(readonly client: VortexusClient) {
        super()
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

    public find(data: NormalCooldownData): NormalCooldown | undefined
    public find(data: SubcommandCooldownData): SubcommandCooldown | undefined
    public find(data: SubcommandGroupCooldownData): SubcommandGroupCooldown | undefined
    public find(data: AnyCooldownData): AnyCooldown | undefined {
        switch (data.cooldown_type) {
            case CooldownType.Normal: {
                return this.findNormal(data as NormalCooldownData)
            }
            case CooldownType.Subcommand: {
                return this.findSubcommand(data as SubcommandCooldownData)
            }
            case CooldownType.SubcommandGroup: {
                return this.findSubcommandGroup(data as SubcommandGroupCooldownData)
            }
        }
    }

    private findNormal(data: NormalCooldownData): NormalCooldown | undefined {
        return this.normalCooldowns.find(cooldown => {
            if (data.userId !== cooldown.userId) return false;
            if (data.guildId && data.guildId !== cooldown.guildId) return false;
            if (data.channelId && data.channelId !== cooldown.channelId) return false;
            if (data.commandName !== cooldown.commandName) return false;

            if (cooldown.hasEnded()) {
                this._cache.delete(cooldown.id)
                return false
            }

            return true
        })
    }

    private findSubcommand(data: SubcommandCooldownData): SubcommandCooldown | undefined {
        return this.subcommandCooldowns.find(cooldown => {
            if (data.userId !== cooldown.userId) return false;
            if (data.guildId && data.guildId !== cooldown.guildId) return false;
            if (data.channelId && data.channelId !== cooldown.channelId) return false;
            if (data.commandName && data.commandName !== cooldown.commandName) return false;
            if (data.commandSubcommandName !== cooldown.commandSubcommandName) return false;

            if (cooldown.hasEnded()) {
                this._cache.delete(cooldown.id)
                return false
            }

            return true
        })
    }

    private findSubcommandGroup(data: SubcommandGroupCooldownData): SubcommandGroupCooldown | undefined {
        return this.subcommandGroupCooldowns.find(cooldown => {
            if (data.userId !== cooldown.userId) return false;
            if (data.guildId && data.guildId !== cooldown.guildId) return false;
            if (data.channelId && data.channelId !== cooldown.channelId) return false;
            if (data.commandName && data.commandName !== cooldown.commandName) return false;
            if (data.commandSubcommandGroupName !== cooldown.commandSubcommandGroupName) return false;

            if (cooldown.hasEnded()) {
                this._cache.delete(cooldown.id)
                return false
            }

            return true
        })
    }

    public setCooldownCacheSweeper(options: Omit<CooldownCacheSweeperOptions, "filter">): NodeJS.Timeout {
        if (this._sweeper) clearInterval(this._sweeper);

        return this._sweeper = setInterval(() => this.sweepCache(), options.sweepFrequencyMs).unref()
    }

    public sweepCache(options?: Omit<CooldownCacheSweeperOptions, "sweepFrequencyMs">): void {
        this._cache.sweep(cooldown => cooldown.hasEnded() || (!options?.filter || options.filter(cooldown)))
    }

    public toJSON(): AnyCooldownData[] {
        return this.cache.map(cooldown => cooldown.toJSON());
    }
}