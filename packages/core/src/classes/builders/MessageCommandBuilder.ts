import { normalizeArray, RestOrArray } from "discord.js";
import { AnyMessageCommandOptionBuilder, AnyMessageCommandOptionBuilderData, MessageCommandIntegerOptionResolvable, MessageCommandStringOptionResolvable } from "../../types/structures.js";
import { MessageCommandBooleanOptionBuilder, MessageCommandChannelOptionBuilder, MessageCommandIntegerOptionBuilder, MessageCommandNumberOptionBuilder, MessageCommandRoleOptionBuilder, MessageCommandStringOptionBuilder, MessageCommandUserOptionBuilder } from "./MessageCommandOptionBuilders.js";
import { MessageCommandOptionType } from "../../types/constants.js";
import { MessageCommandBuilderData } from "../../interfaces/builders/MessageCommandBuilder.js";

export class MessageCommandBuilder implements MessageCommandBuilderData {
    public name!: string;
    public description!: string;
    public aliases?: string[] | undefined;
    public dm_permission?: boolean | undefined;
    public allow_bots?: boolean | undefined;
    public options: AnyMessageCommandOptionBuilder[] = [];

    constructor(data: MessageCommandBuilderData) {
        this.setName(data.name);
        this.setDescription(data.description);
        
        if (data.aliases) this.setAliases(data.aliases);
        if (data.dm_permission) this.setDMPermission(data.dm_permission);
        if (data.allow_bots) this.setAllowBots(data.allow_bots);
        if (data.options && data.options.length > 0) {
            for (const option of data.options) {
                if (option.type === MessageCommandOptionType.Boolean) this.addBooleanOption(MessageCommandBooleanOptionBuilder.from(option));
                if (option.type === MessageCommandOptionType.Channel) this.addChannelOption(MessageCommandChannelOptionBuilder.from(option));
                if (option.type === MessageCommandOptionType.Integer) this.addIntegerOption(MessageCommandIntegerOptionBuilder.from(option));
                if (option.type === MessageCommandOptionType.Number) this.addNumberOption(MessageCommandNumberOptionBuilder.from(option));
                if (option.type === MessageCommandOptionType.Role) this.addRoleOption(MessageCommandRoleOptionBuilder.from(option));
                if (option.type === MessageCommandOptionType.String) this.addStringOption(MessageCommandStringOptionBuilder.from(option));
                if (option.type === MessageCommandOptionType.User) this.addUserOption(MessageCommandUserOptionBuilder.from(option))
            }
        }
    }

    public setName(name: string): this {
        this.name = name
        return this
    }

    public setDescription(description: string): this {
        this.description = description
        return this
    }

    public setAliases(...aliases: RestOrArray<string>): this {
        aliases = normalizeArray(aliases)
        this.aliases = aliases
        return this;
    }

    public setDMPermission(dm_permission: boolean): this {
        this.dm_permission = dm_permission
        return this
    }

    public setAllowBots(allow_bots: boolean): this {
        this.allow_bots = allow_bots
        return this
    }

    public addStringOption(input: MessageCommandStringOptionResolvable | ((stringOption: MessageCommandStringOptionBuilder) => MessageCommandStringOptionBuilder)): this {
        const stringOption = typeof input === "function" ? input(new MessageCommandStringOptionBuilder()) : MessageCommandStringOptionBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.options.find(option => option.name === stringOption.name)) throw new Error("option already exists");
        if (this.options.length > 0 && this.options.some(option => !option.required) && stringOption.required) throw new Error("req opts must be first")

        this.options.push(MessageCommandStringOptionBuilder.resolve(stringOption))
        return this;
    }

    public addIntegerOption(input: MessageCommandIntegerOptionResolvable | ((stringOption: MessageCommandIntegerOptionBuilder) => MessageCommandIntegerOptionBuilder)): this {
        const integerOption = typeof input === "function" ? input(new MessageCommandIntegerOptionBuilder()) : MessageCommandIntegerOptionBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.options.find(option => option.name === integerOption.name)) throw new Error("option already exists");
        if (this.options.length > 0 && this.options.some(option => !option.required) && integerOption.required) throw new Error("req opts must be first")

        this.options.push(MessageCommandIntegerOptionBuilder.resolve(integerOption))
        return this;
    }

    public addNumberOption(input: MessageCommandNumberOptionBuilder | ((stringOption: MessageCommandNumberOptionBuilder) => MessageCommandNumberOptionBuilder)): this {
        const numberOption = typeof input === "function" ? input(new MessageCommandNumberOptionBuilder()) : MessageCommandNumberOptionBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.options.find(option => option.name === numberOption.name)) throw new Error("option already exists");
        if (this.options.length > 0 && this.options.some(option => !option.required) && numberOption.required) throw new Error("req opts must be first")

        this.options.push(MessageCommandNumberOptionBuilder.resolve(numberOption))
        return this;
    }

    public addBooleanOption(input: MessageCommandBooleanOptionBuilder | ((stringOption: MessageCommandBooleanOptionBuilder) => MessageCommandBooleanOptionBuilder)): this {
        const booleanOption = typeof input === "function" ? input(new MessageCommandBooleanOptionBuilder()) : MessageCommandBooleanOptionBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.options.find(option => option.name === booleanOption.name)) throw new Error("option already exists");
        if (this.options.length > 0 && this.options.some(option => !option.required) && booleanOption.required) throw new Error("req opts must be first")

        this.options.push(MessageCommandBooleanOptionBuilder.resolve(booleanOption))
        return this;
    }

    public addUserOption(input: MessageCommandUserOptionBuilder | ((stringOption: MessageCommandUserOptionBuilder) => MessageCommandUserOptionBuilder)): this {
        const userOption = typeof input === "function" ? input(new MessageCommandUserOptionBuilder()) : MessageCommandUserOptionBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.options.find(option => option.name === userOption.name)) throw new Error("option already exists");
        if (this.options.length > 0 && this.options.some(option => !option.required) && userOption.required) throw new Error("req opts must be first")

        this.options.push(MessageCommandUserOptionBuilder.resolve(userOption))
        return this;
    }

    public addChannelOption(input: MessageCommandChannelOptionBuilder | ((stringOption: MessageCommandChannelOptionBuilder) => MessageCommandChannelOptionBuilder)): this {
        const channelOption = typeof input === "function" ? input(new MessageCommandChannelOptionBuilder()) : MessageCommandChannelOptionBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.options.find(option => option.name === channelOption.name)) throw new Error("option already exists");
        if (this.options.length > 0 && this.options.some(option => !option.required) && channelOption.required) throw new Error("req opts must be first")

        this.options.push(MessageCommandChannelOptionBuilder.resolve(channelOption))
        return this;
    }

    public addRoleOption(input: MessageCommandRoleOptionBuilder | ((stringOption: MessageCommandRoleOptionBuilder) => MessageCommandRoleOptionBuilder)): this {
        const roleOption = typeof input === "function" ? input(new MessageCommandRoleOptionBuilder()) : MessageCommandRoleOptionBuilder.from(input)

        //TODO - Replace throw with custom Vortexus.js error
        if (this.options.find(option => option.name === roleOption.name)) throw new Error("option already exists");
        if (this.options.length > 0 && this.options.some(option => !option.required) && roleOption.required) throw new Error("req opts must be first")

        this.options.push(MessageCommandRoleOptionBuilder.resolve(roleOption))
        return this;
    }

    public toJSON(): MessageCommandBuilderData {
        return {
            name: this.name,
            description: this.description,
            aliases: this.aliases,
            dm_permission: this.dm_permission,
            allow_bots: this.allow_bots,
            options: this.options.map(option => option.toJSON())
        }
    }
}