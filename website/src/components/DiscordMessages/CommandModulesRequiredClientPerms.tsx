import { DiscordCode, DiscordCommand, DiscordMessage, DiscordMessages } from "@skyra/discord-components-react";

export default function CommandModulesRequiredClientPerms() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="vortexus" ephemeral={true} >
                <DiscordCommand slot="reply" command="/ping" profile="padventures" />
                I do not have the <DiscordCode>SendMessages</DiscordCode> permission
            </DiscordMessage>
        </DiscordMessages>
    )
}