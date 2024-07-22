import { isJSONEncodable, JSONEncodable } from "discord.js";
import { MessageCommandOptionType } from "../../../types/Enums.js";
import { MessageCommandOptionBuilder, MessageCommandOptionBuilderData } from "./MessageCommandOptionBuilder.js";

export interface MessageCommandBooleanOptionBuilderData extends MessageCommandOptionBuilderData {
    type: MessageCommandOptionType.Boolean;
}

export class MessageCommandBooleanOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandBooleanOptionBuilderData {
    public override type: MessageCommandOptionType.Boolean = MessageCommandOptionType.Boolean;

    public static from(data: MessageCommandBooleanOptionResolvable): MessageCommandBooleanOptionBuilder {
        return new MessageCommandBooleanOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandBooleanOptionResolvable): MessageCommandBooleanOptionBuilder {
        return data instanceof MessageCommandBooleanOptionBuilder ? data : this.from(data)
    }

    constructor(data?: MessageCommandBooleanOptionBuilderData) {
        super(data)
    }

    public toJSON(): MessageCommandBooleanOptionBuilderData {
        return {
            ...this._toJSON(),
            type: this.type
        }
    }
}

export type MessageCommandBooleanOptionResolvable = MessageCommandBooleanOptionBuilderData | JSONEncodable<MessageCommandBooleanOptionBuilderData>