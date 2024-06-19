import { DiscordCode, DiscordCommand, DiscordMessage, DiscordMessages } from "@skyra/discord-components-react";

export default function CommandModulesRequiredBotPerms() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="vortexus" ephemeral={true} >
                <DiscordCommand slot="reply" command="/ping" profile="padventures" />
                You do not have the <DiscordCode>ReadMessageHistory</DiscordCode> permission
            </DiscordMessage>
        </DiscordMessages>
    )
}