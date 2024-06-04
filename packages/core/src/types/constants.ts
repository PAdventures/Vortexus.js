import PackageJson from "../../package.json";
import SemVerCoerce from "semver/functions/coerce.js";

export const packageVersion = PackageJson.version;
export const version = SemVerCoerce(packageVersion)!.toString();

export enum CommandType {
    SlashCommand,
    ContextMenuCommand,
    MessageCommand
}

export enum ModuleType {
    DefaultModule,
    CommandModule,
}

export enum CooldownType {
    Normal,
    SubcommandGroup,
    Subcommand
}

export enum MessageCommandOptionType {
    String,
    Integer,
    Number,
    Boolean,
    User,
    Channel,
    Role,
}

export enum MessageCommandMentionablesValueType {
    Snowflake,
    Mention
}