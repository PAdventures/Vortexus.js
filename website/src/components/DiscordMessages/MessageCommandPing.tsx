import { DiscordMessages, DiscordMessage, DiscordReply } from "@skyra/discord-components-react";

export default function MessageCommandPing() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="padventures">!ping</DiscordMessage>
            <DiscordMessage profile="vortexus">
                <DiscordReply slot="reply" profile="padventures" >!ping</DiscordReply>
                Pong
            </DiscordMessage>
        </DiscordMessages>
    )
}