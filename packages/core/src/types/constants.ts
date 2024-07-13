import packageJSON from "../../package.json";
import SemVerCoerce from "semver/functions/coerce.js"

export const packageVersion = packageJSON.version;
export const version = SemVerCoerce(packageVersion)!.toString();

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

<<<<<<< Updated upstream
export enum PreconditionResultType {
    Pass,
    Fail
}

export enum ModuleType {
    Command,
    Event
}

export enum EventInteractionType {
    InteractionCreate,
    SelectMenu,
    AutoComplete,
    Button,
    ModalSubmit
=======
export enum VortexusModuleStatus {
    Unloaded,
    Unloading,
    Loaded,
    Loading,
    PreLoaded,
    PreLoading,
>>>>>>> Stashed changes
}