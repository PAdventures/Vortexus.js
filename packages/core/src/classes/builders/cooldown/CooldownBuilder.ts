import { isJSONEncodable, JSONEncodable, SlashCommandBuilder } from "discord.js";
import { SubcommandCooldownBuilder, SubcommandCooldownBuilderData } from "./SubcommandCooldownBuilder.js";
import { SubcommandGroupCooldownBuilder, SubcommandGroupCooldownBuilderData } from "./SubcommandGroupCooldownBuilder.js";

export interface CooldownBuilderData {
    root: number;
    subcommandGroups?: SubcommandGroupCooldownBuilderData[];
    subcommands?: SubcommandCooldownBuilderData[]
}

export class CooldownBuilder implements CooldownBuilderData {
    public root!: number;
    public subcommandGroups: SubcommandGroupCooldownBuilderData[] = [];
    public subcommands: SubcommandCooldownBuilderData[] = [];

    public static from(data: CooldownResolvable): CooldownBuilder {
        return new CooldownBuilder(isJSONEncodable(data) ? data.toJSON() : data);
    }

    public static resolve(data: CooldownResolvable): CooldownBuilder {
        return data instanceof CooldownBuilder ? data : this.from(data);
    }

    constructor(data?: CooldownBuilderData) {
        if (data?.root) this.setRoot(data.root);
        if (data?.subcommandGroups) {
            for (const subcommandGroup of data.subcommandGroups) {
                this.addSubcommandGroup(SubcommandGroupCooldownBuilder.from(subcommandGroup))
            }
        }
        if (data?.subcommands) {
            for (const subcommand of data.subcommands) {
                this.addSubcommand(SubcommandCooldownBuilder.from(subcommand))
            }
        }
    }

    public setRoot(cooldown: number): Omit<this, 'setRoot'> {
        this.root = cooldown;
        return this
    }

    public addSubcommandGroup(input: SubcommandGroupCooldownBuilder | ((subcommandGroup: SubcommandGroupCooldownBuilder) => SubcommandGroupCooldownBuilder)): this {
        const subcommandGroupCooldown = typeof input === "function" ? input(new SubcommandGroupCooldownBuilder()) : SubcommandGroupCooldownBuilder.from(input);

        //TODO - Replace throw with custom Vortexus.js error
        if (this.subcommandGroups.find(subcommandGroup => subcommandGroup.name === subcommandGroupCooldown.name)) throw new Error("subcommand group cooldown already exists");

        this.subcommandGroups.push(SubcommandGroupCooldownBuilder.resolve(subcommandGroupCooldown))

        return this;
    }

    public addSubcommand(input: SubcommandCooldownBuilder | ((subcommand: SubcommandCooldownBuilder) => SubcommandCooldownBuilder)): this {
        const subcommandCooldown = typeof input === "function" ? input(new SubcommandCooldownBuilder()) : SubcommandCooldownBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.subcommands.find(subcommand => subcommand.name === subcommandCooldown.name)) throw new Error("subcommand cooldown already exists");

        this.subcommands.push(SubcommandCooldownBuilder.resolve(subcommandCooldown))

        return this;
    }
}

export type CooldownResolvable = CooldownBuilderData | JSONEncodable<CooldownBuilderData>;