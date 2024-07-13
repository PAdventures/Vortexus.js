import { Awaitable, Client, If } from "discord.js";
import { VortexusClientData, VortexusClientEvents } from "../../interfaces/structures/VortexusClient.js";
import { version } from "../../types/constants.js";
import { Logger } from "@vortexus.js/utility";
import { ModuleManager } from "../managers/ModuleManager.js";

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

export class VortexusClient<Ready extends boolean = boolean> extends Client<Ready> implements VortexusClientData<Ready> {
    public readonly version: string = version;

    public modules: ModuleManager = new ModuleManager(this);

    public logger: Logger | null = null;

    public async login(token?: string): Promise<string> {
        if (token) this.token === token

        token = await super.login(token);

        return token
    }
}