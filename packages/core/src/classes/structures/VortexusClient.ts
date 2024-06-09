import { ApplicationCommand, Awaitable, Client, ClientEvents, Collection, If } from "discord.js";
import { version } from "../../types/constants.js";
import { CommandManager } from "../managers/CommandManager.js";
import { CooldownManager } from "../managers/CooldownManager.js";
import { ModuleManager } from "../managers/ModuleManagers.js";
import { VortexusClientConfig } from "../../types/structures.js";
import { Logger } from "@vortexus.js/utility"

export interface VortexusClientEvents extends ClientEvents {
    vortexusError: [error: Error],
    vortexusWarn: [message: string],
    vortexusDebug: [message: string],
    vortexusLog: [message: string],
    vortexusCommandsRegistered: [commands: Collection<string, ApplicationCommand>, guildId?: string],
}

export interface VortexusClient<Ready extends boolean = boolean> extends Client<Ready> {
    once<Event extends keyof VortexusClientEvents>(event: Event, listener: (...args: VortexusClientEvents[Event]) => Awaitable<void>): this;
    once<Event extends string|symbol>(event: Event, listener: (...args: any) => Awaitable<void>): this;

    on<Event extends keyof VortexusClientEvents>(event: Event, listener: (...args: VortexusClientEvents[Event]) => Awaitable<void>): this;
    on<Event extends string|symbol>(event: Event, listener: (...args: any) => Awaitable<void>): this;


    emit<Event extends keyof VortexusClientEvents>(event: Event, ...args: VortexusClientEvents[Event]): boolean;
    emit<Event extends string|symbol>(event: Event, ...args: any): boolean;


    off<Event extends keyof VortexusClientEvents>(event: Event, listener: (...args: VortexusClientEvents[Event]) => Awaitable<void>): this;
    off<Event extends string|symbol>(event: Event, listener: (...args: any) => Awaitable<void>): this;

    removeListener<Event extends keyof VortexusClientEvents>(event: Event, listener: Function): this;
    removeListener<Event extends string|symbol>(event: Event, listener: Function): this;

    removeAllListeners<Event extends keyof VortexusClientEvents>(event: Event): this;
    removeAllListeners<Event extends string|symbol>(event: Event): this;

    isReady(): this is VortexusClient<true>
}

export class VortexusClient<Ready extends boolean = boolean> extends Client<Ready> {
    readonly version: string = version

    protected _commands: CommandManager | null = null
    protected _cooldowns: CooldownManager | null = null

    public modules: ModuleManager = new ModuleManager(this)

    public logger: Logger | null = null

    get commands() {
        return this._commands as If<Ready, CommandManager>
    }

    get cooldowns() {
        return this._cooldowns as If<Ready, CooldownManager>
    }

    constructor(readonly config: VortexusClientConfig) {
        super(config.client)
    }

    public setLogger(logger: Logger | null): this {
        this.logger = logger
        return this
    }

    public async login(token?: string): Promise<string> {
        if (token) this.config.token === token

        this._commands = new CommandManager(this as VortexusClient<true>);
        this._cooldowns = new CooldownManager(this as VortexusClient<true>, this.config.cooldowns?.sweeper);

        token = await super.login(this.config.token)

        return token
    }
}