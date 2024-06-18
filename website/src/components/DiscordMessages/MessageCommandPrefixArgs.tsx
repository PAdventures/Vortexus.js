import { DiscordMessages, DiscordMessage, DiscordReply, DiscordCode } from "@skyra/discord-components-react";

export default function MessageCommandPrefixArgs() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="padventures">!ping;true</DiscordMessage>
            <DiscordMessage profile="vortexus">
                <DiscordReply slot="reply" profile="padventures" >!ping;true</DiscordReply>
                Pong
            </DiscordMessage>
            <DiscordMessage profile="padventures">ping true</DiscordMessage>
            <DiscordMessage profile="padventures">Why isn't the bot responding?</DiscordMessage>
            <DiscordMessage profile="padventures">!explain</DiscordMessage>
            <DiscordMessage profile="vortexus">
                <DiscordReply slot="reply" profile="padventures">!explain</DiscordReply>
                Because you weren't using the prefix: <DiscordCode>!</DiscordCode> or argument separator <DiscordCode>;</DiscordCode>
            </DiscordMessage>
        </DiscordMessages>
    )
}