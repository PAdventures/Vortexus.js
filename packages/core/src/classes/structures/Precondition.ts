import { Result } from "@sapphire/result";
import { Awaitable } from "discord.js";
import { CommandType, PreconditionResultType } from "../../types/constants.js";
import { SlashCommandPreconditionExecuteFunction, ContextMenuCommandPreconditionExecuteFunction, MessageCommandPreconditionExecuteFunction, AnyCommandExecuteData } from "../../types/structures.js";

export interface PreconditionData {
    id: string;
    slashCommandExecute?: SlashCommandPreconditionExecuteFunction;
    contextCommandExecute?: ContextMenuCommandPreconditionExecuteFunction;
    messageCommandExecute?: MessageCommandPreconditionExecuteFunction;
}

export interface PreconditionResultData {
    precondition: Precondition;
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

export type PreconditionResult = Awaitable<Result<unknown, string | undefined>>;
export type FinalPreconditionResult = Awaitable<Result<PreconditionPassResultData, PreconditionFailResultData>>;

export abstract class Precondition implements PreconditionData {
    public readonly id: string;
    public slashCommandExecute?: SlashCommandPreconditionExecuteFunction | undefined;
    public contextCommandExecute?: ContextMenuCommandPreconditionExecuteFunction | undefined;
    public messageCommandExecute?: MessageCommandPreconditionExecuteFunction | undefined;

    constructor(data: PreconditionData) {
        this.id = data.id;
        this.slashCommandExecute = data.slashCommandExecute;
        this.contextCommandExecute = data.contextCommandExecute;
        this.messageCommandExecute = data.messageCommandExecute;
    }

    protected OK(): Precondition.Result {
        return Result.ok();
    }

    protected ERR(message?: string): Precondition.Result {
        return Result.err(message)
    }

    public async execute(executeData: AnyCommandExecuteData): Promise<Precondition.FinalResult> {
        let result: Precondition.Result;
        
        switch (executeData.type) {
            case CommandType.MessageCommand: {
                result = this.messageCommandExecute ? Promise.resolve(this.messageCommandExecute(executeData, this)) : this.OK();
                break;
            }
            case CommandType.SlashCommand: {
                result = this.slashCommandExecute ? Promise.resolve(this.slashCommandExecute(executeData, this)) : this.OK()
                break
            }
            case CommandType.ContextMenuCommand: {
                result = this.contextCommandExecute ? Promise.resolve(this.contextCommandExecute(executeData, this)) : this.OK()
            }
        }
        
        result = await result;

        if (result.isOk()) {
            return Result.ok({
                result: PreconditionResultType.Pass,
                precondition: this,
                executeData
            })
        }
        return Result.err({
            result: PreconditionResultType.Fail,
            precondition: this,
            executeData,
            message: result.unwrapErr()
        })
    }

    public toJSON(): PreconditionData {
        return {
            id: this.id,
            slashCommandExecute: this.slashCommandExecute,
            contextCommandExecute: this.contextCommandExecute,
            messageCommandExecute: this.messageCommandExecute,
        }
    }
}

export namespace Precondition {
    export type Result = PreconditionResult;
    export type FinalResult = FinalPreconditionResult;
}