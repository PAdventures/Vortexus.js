import { isJSONEncodable, JSONEncodable } from "discord.js";
import { MessageCommandOptionType } from "../../../types/Enums.js";
import { MessageCommandOptionBuilder, MessageCommandOptionBuilderData } from "./MessageCommandOptionBuilder.js";

export interface MessageCommandNumberOptionBuilderData extends MessageCommandOptionBuilderData {
    type: MessageCommandOptionType.Number;
    min?: number;
    max?: number;
}

export class MessageCommandNumberOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandNumberOptionBuilderData {
    public override type: MessageCommandOptionType.Number = MessageCommandOptionType.Number;
    public min?: number;
    public max?: number;

    public static from(data: MessageCommandNumberOptionResolvable): MessageCommandNumberOptionBuilder {
        return new MessageCommandNumberOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandNumberOptionResolvable): MessageCommandNumberOptionBuilder {
        return data instanceof MessageCommandNumberOptionBuilder ? data : this.from(data)
    }

    constructor(data?: MessageCommandNumberOptionBuilderData) {
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

    public toJSON(): MessageCommandNumberOptionBuilderData {
        return {
            ...this._toJSON(),
            type: this.type,
            min: this.min,
            max: this.max
        }
    }
}

export type MessageCommandNumberOptionResolvable = MessageCommandNumberOptionBuilderData | JSONEncodable<MessageCommandNumberOptionBuilderData>