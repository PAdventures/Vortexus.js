import { Awaitable,  } from "discord.js";
import { BaseModule, BaseModuleData } from "../BaseModule.js";
import { VortexusClient } from "../../structures/VortexusClient.js";

export interface EventModuleData extends BaseModuleData {
    execute: (client: VortexusClient<true>) => Awaitable<void>;
}

export abstract class EventModule extends BaseModule implements EventModuleData {
    public abstract execute: (client: VortexusClient<true>) => Awaitable<void>;

    public toJSON(): EventModuleData {
        return {
            ...super._toJSON(),
            execute: this.execute,
        }
    }
}