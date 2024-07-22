export enum CommandType {
    SlashCommand,
    ContextMenuCommand,
    MessageCommand
}

export enum MessageCommandOptionType {
    String,
    Number,
    Integer,
    Boolean,
    Channel,
    User,
    Role
}

export enum MessageCommandMentionablesValueType {
    Snowflake,
    Mention
}