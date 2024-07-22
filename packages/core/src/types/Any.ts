import { MessageCommandBooleanOptionBuilderData } from "../classes/builders/message_command_options/MessageCommandBooleanOptionBuilder.js";
import { MessageCommandChannelOptionBuilderData } from "../classes/builders/message_command_options/MessageCommandChannelOptionBuilder.js";
import { MessageCommandIntegerOptionBuilderData } from "../classes/builders/message_command_options/MessageCommandIntegerOptionBuilder.js";
import { MessageCommandNumberOptionBuilderData } from "../classes/builders/message_command_options/MessageCommandNumberOptionBuilder.js";
import { MessageCommandRoleOptionBuilderData } from "../classes/builders/message_command_options/MessageCommandRoleOptionBuilder.js";
import { MessageCommandStringOptionBuilderData } from "../classes/builders/message_command_options/MessageCommandStringOptionBuilder.js";
import { MessageCommandUserOptionBuilderData } from "../classes/builders/message_command_options/MessageCommandUserOptionBuilder.js";

export type AnyMessageCommandOptionBuilderData =
    | MessageCommandBooleanOptionBuilderData
    | MessageCommandChannelOptionBuilderData
    | MessageCommandIntegerOptionBuilderData
    | MessageCommandNumberOptionBuilderData
    | MessageCommandRoleOptionBuilderData
    | MessageCommandStringOptionBuilderData
    | MessageCommandUserOptionBuilderData