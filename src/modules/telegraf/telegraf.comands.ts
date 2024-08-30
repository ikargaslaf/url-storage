import { BotCommand } from "telegraf/typings/core/types/typegram";

export const commands: BotCommand[]  = [
    { command: 'start', description: 'Start interacting with the bot' },
    { command: 'create', description: 'Create a new URL entry' },
    { command: 'delete', description: 'Delete a URL entry' },
    { command: 'list', description: 'List URLs with optional pagination' },
    { command: 'get', description: 'Get URL with given id' },
    { command: 'help', description: 'List all available commands with additional info'}
]
