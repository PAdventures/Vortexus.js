import { isJSONEncodable, JSONEncodable } from "discord.js";
import { MessageCommandOptionType } from "../../../types/Enums.js";
import { MessageCommandOptionBuilder, MessageCommandOptionBuilderData } from "./MessageCommandOptionBuilder.js";

export interface MessageCommandIntegerOptionBuilderData extends MessageCommandOptionBuilderData {
    type: MessageCommandOptionType.Integer;
    min?: number;
    max?: number;
}

export class MessageCommandIntegerOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandIntegerOptionBuilderData {
    public override type: MessageCommandOptionType.Integer = MessageCommandOptionType.Integer;
    public min?: number;
    public max?: number;

    public static from(data: MessageCommandIntegerOptionResolvable): MessageCommandIntegerOptionBuilder {
        return new MessageCommandIntegerOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandIntegerOptionResolvable): MessageCommandIntegerOptionBuilder {
        return data instanceof MessageCommandIntegerOptionBuilder ? data : this.from(data)
    }

    constructor(data?: MessageCommandIntegerOptionBuilderData) {
        super(data)

        if (data?.min) this.setMin(data.min);
        if (data?.max) this.setMax(data.max)
    }

    public setMin(min: number): this {
        this.min = min;
        return this
    };

    public setMax(max: number): this {
        this.max = max;
        return this
    }

    public toJSON(): MessageCommandIntegerOptionBuilderData {
        return {
            ...this._toJSON(),
            type: this.type,
            min: this.min,
            max: this.max
        }
    }
}

export type MessageCommandIntegerOptionResolvable = MessageCommandIntegerOptionBuilderData | JSONEncodable<MessageCommandIntegerOptionBuilderData>