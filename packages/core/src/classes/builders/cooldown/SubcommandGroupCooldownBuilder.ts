import { SubcommandCooldownBuilder, SubcommandCooldownBuilderData } from './SubcommandCooldownBuilder.js';
import { isJSONEncodable, JSONEncodable } from "discord.js";

export interface SubcommandGroupCooldownBuilderData {
    name: string;
    root: number;
    subcommands?: SubcommandCooldownBuilderData[]
}

export class SubcommandGroupCooldownBuilder implements SubcommandGroupCooldownBuilderData {
    public name!: string;
    public root!: number;
    public subcommands: SubcommandCooldownBuilderData[] = [];

    public static from(data: SubcommandGroupCooldownResolvable): SubcommandGroupCooldownBuilder {
        return new SubcommandGroupCooldownBuilder(isJSONEncodable(data) ? data.toJSON() : data);
    }

    public static resolve(data: SubcommandGroupCooldownResolvable): SubcommandGroupCooldownBuilder {
        return data instanceof SubcommandGroupCooldownBuilder ? data : this.from(data);
    }

    constructor(data?: SubcommandGroupCooldownBuilderData) {
        if (data?.name) this.setName(data.name)
        if (data?.root) this.setRoot(data.root)
        if (data?.subcommands) {
            for (const subcommand of data.subcommands) {
                this.addSubcommand(SubcommandCooldownBuilder.from(subcommand))
            }
        }
    }

    public setName(name: string): Omit<this, 'setName'> {
        this.name = name;
        return this
    }

    public setRoot(cooldown: number): Omit<this, 'setRoot'> {
        this.root = cooldown
        return this
    }

    public addSubcommand(input: SubcommandCooldownBuilder | ((subcommand: SubcommandCooldownBuilder) => SubcommandCooldownBuilder)): this {
        const subcommandCooldown = typeof input === "function" ? input(new SubcommandCooldownBuilder()) : SubcommandCooldownBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.subcommands.find(subcommand => subcommand.name === subcommandCooldown.name)) throw new Error("subcommand cooldown already exists");

        this.subcommands.push(SubcommandCooldownBuilder.resolve(subcommandCooldown))

        return this;
    }
}

export type SubcommandGroupCooldownResolvable = SubcommandGroupCooldownBuilderData | JSONEncodable<SubcommandGroupCooldownBuilderData>