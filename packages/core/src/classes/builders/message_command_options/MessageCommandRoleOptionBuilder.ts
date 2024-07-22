import { isJSONEncodable, JSONEncodable } from "discord.js";
import { MessageCommandMentionablesValueType, MessageCommandOptionType } from "../../../types/Enums.js";
import { MessageCommandOptionBuilder, MessageCommandOptionBuilderData } from "./MessageCommandOptionBuilder.js";

export interface MessageCommandRoleOptionBuilderData extends MessageCommandOptionBuilderData {
    type: MessageCommandOptionType.Role;
    value_type?: MessageCommandMentionablesValueType;
}

export class MessageCommandRoleOptionBuilder extends MessageCommandOptionBuilder implements MessageCommandRoleOptionBuilderData {
    public override type: MessageCommandOptionType.Role = MessageCommandOptionType.Role;
    public value_type?: MessageCommandMentionablesValueType;

    public static from(data: MessageCommandRoleOptionResolvable): MessageCommandRoleOptionBuilder {
        return new MessageCommandRoleOptionBuilder(isJSONEncodable(data) ? data.toJSON() : data)
    }

    public static resolve(data: MessageCommandRoleOptionResolvable): MessageCommandRoleOptionBuilder {
        return data instanceof MessageCommandRoleOptionBuilder ? data : this.from(data)
    }

    constructor(data?: MessageCommandRoleOptionBuilderData) {
        super(data)

        if (data?.value_type) this.setValueType(data.value_type);
    }

    public setValueType(value_type: MessageCommandMentionablesValueType): this {
        this.value_type = value_type;
        return this;
    }

    public toJSON(): MessageCommandRoleOptionBuilderData {
        return {
            ...this._toJSON(),
            type: this.type,
            value_type: this.value_type,
        }
    }
}

export type MessageCommandRoleOptionResolvable = MessageCommandRoleOptionBuilderData | JSONEncodable<MessageCommandRoleOptionBuilderData>;