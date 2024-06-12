import { DMChannel, Guild, PartialDMChannel, TextBasedChannel, User } from "discord.js";
import { CooldownManager } from "../managers/CooldownManager.js";
import { generateId } from '@vortexus.js/utility';

export interface CooldownData {
    userId: string;
    endsAt: Date;
    guildId?: string;
    channelId?: string;
    commandName: string;
}

export class Cooldown implements CooldownData {
    readonly id: string;
    readonly userId: string;
    readonly endsAt: Date;
    readonly guildId?: string | undefined;
    readonly channelId?: string | undefined;
    readonly commandName: string;
    readonly createdAt: Date = new Date();

    get remainingTime() {
        const remaining = this.endsAt.getTime() - Date.now();
        return remaining >= 0 ? remaining : 0
    }

    get channel(): TextBasedChannel | undefined {
        if (this.channelId) return this.manager.client.channels.cache.get(this.channelId) as TextBasedChannel | undefined
        return undefined
    }

    get user(): User | undefined {
        return this.manager.client.users.cache.get(this.userId)
    }

    get dmChannel(): DMChannel | PartialDMChannel | undefined {
        const channel = this.channel
        if (channel) return channel.isDMBased() ? channel : undefined
        return undefined
    }

    get guild(): Guild | undefined {
        if (this.guildId) return this.manager.client.guilds.cache.get(this.guildId)
        return undefined
    }

    constructor(data: CooldownData, readonly manager: CooldownManager) {
        this.id = generateId();
        this.userId = data.userId;
        this.endsAt = data.endsAt;
        this.guildId = data.guildId;
        this.channelId = data.channelId;
        this.commandName = data.commandName;
    }

    public hasEnded(): boolean {
        return this.endsAt.getTime() <= Date.now()
    }

    public toJSON(): CooldownData & { id: string } {
        return {
            id: this.id,
            userId: this.userId,
            endsAt: this.endsAt,
            guildId: this.guildId,
            commandName: this.commandName,
        }
    }
}