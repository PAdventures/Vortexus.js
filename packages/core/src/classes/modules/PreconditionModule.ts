import { Awaitable } from "discord.js";
import { ModuleType, PreconditionResultType } from "../../types/constants.js";
import { AnyCommandExecuteData, ContextMenuCommandPreconditionExecuteFunction, MessageCommandPreconditionExecuteFunction, SlashCommandPreconditionExecuteFunction } from "../../types/structures.js";
import { BaseModule, BaseModuleData } from "./BaseModule.js";
import { Result } from "@sapphire/result";

export interface PreconditionModuleData extends BaseModuleData {
    unique_name: string;
    slashCommandExecute?: SlashCommandPreconditionExecuteFunction;
    contextCommandExecute?: ContextMenuCommandPreconditionExecuteFunction;
    messageCommandExecute?: MessageCommandPreconditionExecuteFunction;
}

export interface PreconditionResultData {
    precondition: PreconditionModule;
    result: PreconditionResultType;
    executeData: AnyCommandExecuteData;
}

export interface PreconditionPassResultData extends PreconditionResultData {
    result: PreconditionResultType.Pass;
}

export interface PreconditionFailResultData extends PreconditionResultData {
    result: PreconditionResultType.Fail;
    message?: string;
}

export type PreconditionResult = Awaitable<Result<PreconditionPassResultData, PreconditionFailResultData>>

export abstract class PreconditionModule extends BaseModule implements PreconditionModuleData {
    public readonly module_type: ModuleType.PreconditionModule = ModuleType.PreconditionModule;
    public abstract readonly unique_name: string;

    public readonly slashCommandExecute?: SlashCommandPreconditionExecuteFunction;
    public readonly contextMenuCommandExecute?: ContextMenuCommandPreconditionExecuteFunction;
    public readonly messageCommandExecute?: MessageCommandPreconditionExecuteFunction;

    protected OK(executeData: AnyCommandExecuteData): Precondition.Result {
        return Result.ok({
            precondition: this,
            result: PreconditionResultType.Pass,
            executeData
        });
    }

    protected ERR(executeData: AnyCommandExecuteData, message?: string): Precondition.Result {
        return Result.err({
            precondition: this,
            result: PreconditionResultType.Fail,
            executeData,
            message
        })
    }

    public toJSON(): PreconditionModuleData {
        return {
            ...super.toJSON(),
            unique_name: this.unique_name,
            slashCommandExecute: this.slashCommandExecute,
            contextCommandExecute: this.contextMenuCommandExecute,
            messageCommandExecute: this.messageCommandExecute,
        }
    }
}

export namespace Precondition {
    export type Result = PreconditionResult
}