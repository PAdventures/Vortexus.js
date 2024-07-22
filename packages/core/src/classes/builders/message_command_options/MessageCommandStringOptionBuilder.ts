import { isJSONEncodable, JSONEncodable, normalizeArray, RestOrArray } from "discord.js";
import { MessageCommandOptionType } from "../../../types/Enums.js";
import { MessageCommandOptionBuilder, MessageCommandOptionBuilderData } from "./MessageCommandOptionBuilder.js";

export interface MessageCommandStringOptionBuilderData extends MessageCommandOptionBuilderData {
    type: MessageCommandOptionType.String;
    min_length?: number;
    max_length?: number;
    choices?: MessageCommandStringChoiceOption[];
}

export interface MessageCommandStringChoiceOption {
    name: string;
    value: string;
}

export class MessageCommandStringOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandStringOptionBuilderData {
    public override type: MessageCommandOptionType.String = MessageCommandOptionType.String;
    public min_length?: number;
    public max_length?: number;
    public choices?: { name: string; value: string; }[];

    public static from(data: MessageCommandStringOptionResolvable): MessageCommandStringOptionBuilder {
        return new MessageCommandStringOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandStringOptionResolvable): MessageCommandStringOptionBuilder {
        return data instanceof MessageCommandStringOptionBuilder ? data : this.from(data)
    }

    constructor(data?: MessageCommandStringOptionBuilderData) {
        super(data)

        if (data?.min_length) this.setMinLength(data.min_length);
        if (data?.max_length) this.setMaxLength(data.max_length);
        if (data?.choices) this.addChoices(data.choices)
    }

    public setMinLength(min_length: number): this {
        this.min_length = min_length
        return this
    }

    public setMaxLength(max_length: number): this {
        this.max_length = max_length;
        return this
    }

    public addChoices(...choices: RestOrArray<MessageCommandStringChoiceOption>): this {
        choices = normalizeArray(choices);
        this.choices = choices;
        return this;
    }

    public toJSON(): MessageCommandStringOptionBuilderData {
        return {
            ...this._toJSON(),
            type: this.type,
            min_length: this.min_length,
            max_length: this.max_length,
            choices: this.choices
        }
    }
}

export type MessageCommandStringOptionResolvable = MessageCommandStringOptionBuilderData | JSONEncodable<MessageCommandStringOptionBuilderData>;