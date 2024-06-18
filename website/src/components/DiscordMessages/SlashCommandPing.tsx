import { DiscordCommand, DiscordMessage, DiscordMessages } from "@skyra/discord-components-react";

export default function SlashCommandPing() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="vortexus">
                <DiscordCommand slot="reply" command="/ping" profile="padventures" />
                Pong
            </DiscordMessage>
        </DiscordMessages>
    )
}