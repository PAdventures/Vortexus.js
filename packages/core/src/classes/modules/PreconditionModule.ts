import { ModuleType } from "../../types/constants.js";
import { ContextMenuCommandPreconditionExecuteFunction, MessageCommandPreconditionExecuteFunction, SlashCommandPreconditionExecuteFunction } from "../../types/structures.js";
import { BaseModule, BaseModuleData } from "./BaseModule.js";

export interface PreconditionModuleData extends BaseModuleData {
    unique_name: string;
    slashCommandExecute?: SlashCommandPreconditionExecuteFunction;
    contextCommandExecute?: ContextMenuCommandPreconditionExecuteFunction;
    messageCommandExecute?: MessageCommandPreconditionExecuteFunction;
}

export abstract class PreconditionModule extends BaseModule implements PreconditionModuleData {
    public readonly module_type: ModuleType.PreconditionModule = ModuleType.PreconditionModule;
    public abstract readonly unique_name: string;

    public readonly slashCommandExecute?: SlashCommandPreconditionExecuteFunction;
    public readonly contextMenuCommandExecute?: ContextMenuCommandPreconditionExecuteFunction;
    public readonly messageCommandExecute?: MessageCommandPreconditionExecuteFunction;
}