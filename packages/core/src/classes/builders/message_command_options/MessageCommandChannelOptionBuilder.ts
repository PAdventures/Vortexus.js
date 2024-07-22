import { ChannelType, isJSONEncodable, JSONEncodable, normalizeArray, RestOrArray } from "discord.js";
import { MessageCommandMentionablesValueType, MessageCommandOptionType } from "../../../types/Enums.js";
import { MessageCommandOptionBuilder, MessageCommandOptionBuilderData } from "./MessageCommandOptionBuilder.js";

export interface MessageCommandChannelOptionBuilderData extends MessageCommandOptionBuilderData {
    type: MessageCommandOptionType.Channel;
    value_type?: MessageCommandMentionablesValueType;
    channel_types?: ChannelType[];
}

export class MessageCommandChannelOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandChannelOptionBuilderData {
    public override type: MessageCommandOptionType.Channel = MessageCommandOptionType.Channel;
    public value_type?: MessageCommandMentionablesValueType;
    public channel_types?: ChannelType[];

    public static from(data: MessageCommandChannelOptionResolvable): MessageCommandChannelOptionBuilder {
        return new MessageCommandChannelOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandChannelOptionResolvable): MessageCommandChannelOptionBuilder {
        return data instanceof MessageCommandChannelOptionBuilder ? data : this.from(data)
    }

    constructor(data?: MessageCommandChannelOptionBuilderData) {
        super(data)

        if (data?.value_type) this.setValueType(data.value_type);
        if (data?.channel_types) this.addChannelTypes(data.channel_types)
    }

    public setValueType(value_type: MessageCommandMentionablesValueType): this {
        this.value_type = value_type;
        return this;
    }

    public addChannelTypes(...channel_types: RestOrArray<ChannelType>): this {
        channel_types = normalizeArray(channel_types);
        this.channel_types = channel_types;
        return this;
    }

    public toJSON(): MessageCommandChannelOptionBuilderData {
        return {
            ...this._toJSON(),
            type: this.type,
            value_type: this.value_type,
            channel_types: this.channel_types
        }
    }
}

export type MessageCommandChannelOptionResolvable = MessageCommandChannelOptionBuilderData | JSONEncodable<MessageCommandChannelOptionBuilderData>