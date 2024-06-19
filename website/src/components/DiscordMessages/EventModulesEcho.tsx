import { DiscordMessage, DiscordMessages } from "@skyra/discord-components-react";

export default function EventModulesEcho() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="padventures">I love Vortexus.js</DiscordMessage>
            <DiscordMessage profile="vortexus">Echo: I love Vortexus.js</DiscordMessage>
        </DiscordMessages>
    )
}