import { isJSONEncodable, JSONEncodable } from "discord.js";

export interface SubcommandCooldownBuilderData {
    name: string;
    cooldown: number;
}

export class SubcommandCooldownBuilder implements SubcommandCooldownBuilderData {
    public name!: string;
    public cooldown!: number;

    public static from(data: SubcommandCooldownResolvable): SubcommandCooldownBuilder {
        return new SubcommandCooldownBuilder(isJSONEncodable(data) ? data.toJSON() : data);
    }

    public static resolve(data: SubcommandCooldownResolvable): SubcommandCooldownBuilder {
        return data instanceof SubcommandCooldownBuilder ? data : this.from(data);
    }

    constructor(data?: SubcommandCooldownBuilderData) {
        if (data?.name) this.setName(data.name)
        if (data?.cooldown) this.setCooldown(data.cooldown)
    }

    public setName(name: string): Omit<this, 'setName'> {
        this.name = name;
        return this
    }

    public setCooldown(cooldown: number): Omit<this, 'setCooldown'> {
        this.cooldown = cooldown
        return this
    }
}

export type SubcommandCooldownResolvable = SubcommandCooldownBuilderData | JSONEncodable<SubcommandCooldownBuilderData>
