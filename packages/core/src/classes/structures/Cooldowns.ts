import { DMChannel, Guild, PartialDMChannel, TextBasedChannel, User } from "discord.js";
import { CooldownManager } from "../managers/CooldownManager.js";
import { generateId } from '@vortexus.js/utility';
import { CooldownType } from "../../types/constants.js";

export interface BaseCooldownData {
    cooldown_type: CooldownType
    userId: string;
    endsAt: Date;
    guildId?: string;
    channelId?: string;
    commandName: string;
}

export interface NormalCooldownData extends BaseCooldownData {
    cooldown_type: CooldownType.Normal;
}

export interface SubcommandGroupCooldownData extends BaseCooldownData {
    cooldown_type: CooldownType.SubcommandGroup;
    commandSubcommandGroupName: string;
}

export interface SubcommandCooldownData extends BaseCooldownData {
    cooldown_type: CooldownType.Subcommand
    commandSubcommandName: string;
}

export abstract class BaseCooldown implements BaseCooldownData {
    readonly abstract cooldown_type: CooldownType;
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

    constructor(data: BaseCooldownData, readonly manager: CooldownManager) {
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

    public isNormalCooldown(): this is NormalCooldown {
        return this.cooldown_type === CooldownType.Normal
    }

    public isSubcommandGroupCooldown(): this is SubcommandGroupCooldown {
        return this.cooldown_type === CooldownType.SubcommandGroup
    }

    public isSubcommandCooldown(): this is SubcommandCooldown {
        return this.cooldown_type === CooldownType.Subcommand
    }

    public _toJSON(): BaseCooldownData {
        return {
            cooldown_type: this.cooldown_type,
            userId: this.userId,
            endsAt: this.endsAt,
            guildId: this.guildId,
            commandName: this.commandName,
        }
    }
}

export class NormalCooldown extends BaseCooldown implements NormalCooldownData {
    readonly cooldown_type: CooldownType.Normal = CooldownType.Normal;

    constructor(data: NormalCooldownData, readonly manager: CooldownManager) {
        super(data, manager)
    }

    public toJSON(): NormalCooldownData {
        return {
            ...this._toJSON(),
            cooldown_type: this.cooldown_type
        }
    }
}

export class SubcommandGroupCooldown extends BaseCooldown implements SubcommandGroupCooldownData {
    readonly cooldown_type: CooldownType.SubcommandGroup = CooldownType.SubcommandGroup;
    readonly commandSubcommandGroupName: string;

    constructor(data: SubcommandGroupCooldownData, readonly manager: CooldownManager) {
        super(data, manager)

        this.commandSubcommandGroupName = data.commandSubcommandGroupName;
    }

    public toJSON(): SubcommandGroupCooldownData {
        return {
            ...this._toJSON(),
            cooldown_type: this.cooldown_type,
            commandSubcommandGroupName: this.commandSubcommandGroupName,
        }
    }
}

export class SubcommandCooldown extends BaseCooldown implements SubcommandCooldownData {
    readonly cooldown_type: CooldownType.Subcommand = CooldownType.Subcommand;
    readonly commandSubcommandName: string;

    constructor(data: SubcommandCooldownData, readonly manager: CooldownManager) {
        super(data, manager)

        this.commandSubcommandName = data.commandSubcommandName
    }

    public toJSON(): SubcommandCooldownData {
        return {
            ...this._toJSON(),
            cooldown_type: this.cooldown_type,
            commandSubcommandName: this.commandSubcommandName,
        }
    }
}