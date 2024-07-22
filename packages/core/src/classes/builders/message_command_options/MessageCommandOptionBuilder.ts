import { MessageCommandOptionType } from "../../../types/Enums.js";

export interface MessageCommandOptionBuilderData {
    name: string;
    description: string;
    type: MessageCommandOptionType;
    required?: boolean
}

export abstract class MessageCommandOptionBuilder implements MessageCommandOptionBuilderData {
    public name!: string;
    public description!: string;
    public abstract type: MessageCommandOptionType;
    public required?: boolean = false;

    constructor(data?: MessageCommandOptionBuilderData) {
        if (data?.name) this.setName(data.name);
        if (data?.description) this.setDescription(data.description);
        if (data?.required) this.setRequired(data.required);
    }

    public setName(name: string): this {
        this.name = name;
        return this
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public setRequired(required: boolean) {
        this.required = required;
        return this
    }

    protected _toJSON(): Omit<MessageCommandOptionBuilderData, 'type'> {
        return {
            name: this.name,
            description: this.description,
            required: this.required
        }
    }
}