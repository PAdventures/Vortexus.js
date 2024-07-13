import { ChannelType, isJSONEncodable, normalizeArray, RestOrArray } from "discord.js";
import { MessageCommandOptionType, MessageCommandMentionablesValueType } from "../../types/constants.js";
import { MessageCommandBooleanOptionResolvable, MessageCommandChannelOptionResolvable, MessageCommandIntegerOptionResolvable, MessageCommandNumberOptionResolvable, MessageCommandRoleOptionResolvable, MessageCommandStringOptionResolvable, MessageCommandUserOptionResolvable } from "../../types/structures.js";
import { MessageCommandOptionBuilderData, MessageCommandStringOptionBuilderData, MessageCommandIntegerOptionBuilderData, MessageCommandNumberOptionBuilderData, MessageCommandBooleanOptionBuilderData, MessageCommandUserOptionBuilderData, MessageCommandChannelOptionBuilderData, MessageCommandRoleOptionBuilderData } from "../../interfaces/builders/MessageCommandOptionBuilders.js";


export abstract class MessageCommandOptionBuilder implements MessageCommandOptionBuilderData {
    public name!: string;
    public description!: string;
    public abstract type: MessageCommandOptionType;
    public required?: boolean = false;

    constructor(data?: MessageCommandOptionBuilderData) {
        if (data) {
            this.setName(data.name);
            this.setDescription(data.description)
    
            if (data.required) {
                this.setRequired(data.required)
            }    
        }
    }

    public setName(name: string): this {
        this.name = name;
        return this
    }

    public setDescription(description: string): this {
        this.description = description
        return this
    }

    public setRequired(required: boolean): this {
        this.required = required;
        return this
    }

    protected _toJSON(): MessageCommandOptionBuilderData {
        return {
            name: this.name,
            description: this.description,
            required: this.required,
        }
    }
}

export class MessageCommandStringOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandStringOptionBuilderData {
    public type: MessageCommandOptionType.String = MessageCommandOptionType.String;
    public min_length?: number | undefined;
    public max_length?: number | undefined;
    public choices: { words: string[]; patterns: RegExp[]; } = { words: [], patterns: [] }

    public static from(data: MessageCommandStringOptionResolvable): MessageCommandStringOptionBuilder {
        return new MessageCommandStringOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandStringOptionResolvable): MessageCommandStringOptionBuilder {
        return data instanceof MessageCommandStringOptionBuilder ? data : this.from(data);
    }

    constructor(data?: MessageCommandStringOptionBuilderData) {
        super(data)

        if (data) {
            if (data.min_length) {
                this.setMinLength(data.min_length)
            }
    
            if (data.max_length) {
                this.setMaxLength(data.max_length)
            }
    
            if (data.choices) {
                if (data.choices.words) {
                    this.setWordChoices(data.choices.words)
                }
                if (data.choices.patterns) {
                    this.setPatternChoices(data.choices.patterns)
                }
            }    
        }
    }

    public setMinLength(min_length: number): this {
        this.min_length = min_length;
        return this
    }

    public setMaxLength(max_length: number): this {
        this.max_length = max_length;
        return this
    }

    public setWordChoices(...word_choices: RestOrArray<string>): this {
        word_choices = normalizeArray(word_choices);
        this.choices.words = word_choices
        return this
    }

    public setPatternChoices(...pattern_choices: RestOrArray<RegExp>): this {
        pattern_choices = normalizeArray(pattern_choices)
        this.choices.patterns = pattern_choices
        return this
    }

    public toJSON(): MessageCommandStringOptionBuilderData {
        return {
            ...super._toJSON(),
            type: this.type,
            min_length: this.min_length,
            max_length: this.max_length,
            choices: {
                words: this.choices.words,
                patterns: this.choices.patterns,
            }
        }
    }
}

export class MessageCommandIntegerOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandIntegerOptionBuilderData {
    public type: MessageCommandOptionType.Integer = MessageCommandOptionType.Integer;
    public min?: number | undefined;
    public max?: number | undefined;

    public static from(data: MessageCommandIntegerOptionResolvable): MessageCommandIntegerOptionBuilder {
        return new MessageCommandIntegerOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandIntegerOptionResolvable): MessageCommandIntegerOptionBuilder {
        return data instanceof MessageCommandIntegerOptionBuilder ? data : this.from(data);
    }
    
    constructor(data?: MessageCommandIntegerOptionBuilderData) {
        super(data)

        if (data) {
            if (data.min) {
                this.setMin(data.min)
            }
            if (data.max) {
                this.setMax(data.max)
            }
        }
    }

    public setMin(min: number): this {
        this.min = min
        return this
    }

    public setMax(max: number): this {
        this.max = max
        return this
    }

    public toJSON(): MessageCommandIntegerOptionBuilderData {
        return {
            ...super._toJSON(),
            type: this.type,
            min: this.min,
            max: this.max
        }
    }
}

export class MessageCommandNumberOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandNumberOptionBuilderData {
    public type: MessageCommandOptionType.Number = MessageCommandOptionType.Number;
    public min?: number | undefined;
    public max?: number | undefined;
    public to_fixed?: number | undefined;

    public static from(data: MessageCommandNumberOptionResolvable): MessageCommandNumberOptionBuilder {
        return new MessageCommandNumberOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandNumberOptionResolvable): MessageCommandNumberOptionBuilder {
        return data instanceof MessageCommandNumberOptionBuilder ? data : this.from(data);
    }
    
    constructor(data?: MessageCommandNumberOptionBuilderData) {
        super(data)

        if (data) {
            if (data.min) {
                this.setMin(data.min)
            }
            if (data.max) {
                this.setMax(data.max)
            }
            if (data.to_fixed) {
                this.setToFixed(data.to_fixed)
            }
        }
    }

    public setMin(min: number): this {
        this.min = min
        return this
    }

    public setMax(max: number): this {
        this.max = max
        return this
    }

    public setToFixed(to_fixed: number): this {
        this.to_fixed = to_fixed;
        return this
    }

    public toJSON(): MessageCommandNumberOptionBuilderData {
        return {
            ...super._toJSON(),
            type: this.type,
            min: this.min,
            max: this.max,
            to_fixed: this.to_fixed
        }
    }
}

export class MessageCommandBooleanOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandBooleanOptionBuilderData {
    public type: MessageCommandOptionType.Boolean = MessageCommandOptionType.Boolean;

    public static from(data: MessageCommandBooleanOptionResolvable): MessageCommandBooleanOptionBuilder {
        return new MessageCommandBooleanOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandBooleanOptionResolvable): MessageCommandBooleanOptionBuilder {
        return data instanceof MessageCommandBooleanOptionBuilder ? data : this.from(data);
    }
    
    constructor(data?: MessageCommandBooleanOptionBuilderData) {
        super(data)
    }

    public toJSON(): MessageCommandBooleanOptionBuilderData {
        return {
            ...super._toJSON(),
            type: this.type
        }
    }
}

export class MessageCommandUserOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandUserOptionBuilderData {
    public type: MessageCommandOptionType.User = MessageCommandOptionType.User;
    public value_type?: MessageCommandMentionablesValueType | undefined;

    public static from(data: MessageCommandUserOptionResolvable): MessageCommandUserOptionBuilder {
        return new MessageCommandUserOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandUserOptionResolvable): MessageCommandUserOptionBuilder {
        return data instanceof MessageCommandUserOptionBuilder ? data : this.from(data);
    }

    constructor(data?: MessageCommandUserOptionBuilderData) {
        super(data)

        if (data) {
            if (data.value_type) {
                this.setValueType(data.value_type)
            }
        }
    }

    public setValueType(value_type: MessageCommandMentionablesValueType): this {
        this.value_type = value_type
        return this
    }

    public toJSON(): MessageCommandUserOptionBuilderData {
        return {
            ...super._toJSON(),
            type: this.type,
            value_type: this.value_type
        }
    }
}

export class MessageCommandChannelOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandChannelOptionBuilderData {
    public type: MessageCommandOptionType.Channel = MessageCommandOptionType.Channel;
    public value_type?: MessageCommandMentionablesValueType | undefined;
    public channel_types?: ChannelType[] = [];

    public static from(data: MessageCommandChannelOptionResolvable): MessageCommandChannelOptionBuilder {
        return new MessageCommandChannelOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandChannelOptionResolvable): MessageCommandChannelOptionBuilder {
        return data instanceof MessageCommandChannelOptionBuilder ? data : this.from(data);
    }

    constructor(data?: MessageCommandChannelOptionBuilderData) {
        super(data)

        if (data) {
            if (data.value_type) {
                this.setValueType(data.value_type)
            }
            if (data.channel_types) {
                this.setChannelTypes(data.channel_types)
            }
        }
    }

    public setValueType(value_type: MessageCommandMentionablesValueType): this {
        this.value_type = value_type
        return this
    }

    public setChannelTypes(...channel_types: RestOrArray<ChannelType>): this {
        channel_types = normalizeArray(channel_types);
        this.channel_types = channel_types
        return this
    }

    public toJSON(): MessageCommandChannelOptionBuilderData {
        return {
            ...super._toJSON(),
            type: this.type,
            value_type: this.value_type,
            channel_types: this.channel_types
        }
    }
}

export class MessageCommandRoleOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandRoleOptionBuilderData {
    public type: MessageCommandOptionType.Role = MessageCommandOptionType.Role;
    public value_type?: MessageCommandMentionablesValueType | undefined;

    public static from(data: MessageCommandRoleOptionResolvable): MessageCommandRoleOptionBuilder {
        return new MessageCommandRoleOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandRoleOptionResolvable): MessageCommandRoleOptionBuilder {
        return data instanceof MessageCommandRoleOptionBuilder ? data : this.from(data);
    }

    constructor(data?: MessageCommandRoleOptionBuilderData) {
        super(data)

        if (data) {
            if (data.value_type) {
                this.setValueType(data.value_type)
            }
        }
    }

    public setValueType(value_type: MessageCommandMentionablesValueType): this {
        this.value_type = value_type
        return this
    }

    public toJSON(): MessageCommandRoleOptionBuilderData {
        return {
            ...super._toJSON(),
            type: this.type,
            value_type: this.value_type
        }
    }
}