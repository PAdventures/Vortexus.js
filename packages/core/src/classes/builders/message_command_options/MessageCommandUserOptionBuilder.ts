import { isJSONEncodable, JSONEncodable } from "discord.js";
import { MessageCommandMentionablesValueType, MessageCommandOptionType } from "../../../types/Enums.js";
import { MessageCommandOptionBuilder, MessageCommandOptionBuilderData } from "./MessageCommandOptionBuilder.js";

export interface MessageCommandUserOptionBuilderData extends MessageCommandOptionBuilderData {
    type: MessageCommandOptionType.User;
    value_type?: MessageCommandMentionablesValueType;
}

export class MessageCommandUserOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandUserOptionBuilderData {
    public override type: MessageCommandOptionType.User = MessageCommandOptionType.User;
    public value_type?: MessageCommandMentionablesValueType;

    public static from(data: MessageCommandUserOptionResolvable): MessageCommandUserOptionBuilder {
        return new MessageCommandUserOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandUserOptionResolvable): MessageCommandUserOptionBuilder {
        return data instanceof MessageCommandUserOptionBuilder ? data : this.from(data)
    }

    constructor(data?: MessageCommandUserOptionBuilderData) {
        super(data)

        if (data?.value_type) this.setValueType(data.value_type);
    }

    public setValueType(value_type: MessageCommandMentionablesValueType): this {
        this.value_type = value_type;
        return this;
    }

    public toJSON(): MessageCommandUserOptionBuilderData {
        return {
            ...this._toJSON(),
            type: this.type,
            value_type: this.value_type,
        }
    }
}

export type MessageCommandUserOptionResolvable = MessageCommandUserOptionBuilderData | JSONEncodable<MessageCommandUserOptionBuilderData>;