import { DiscordCommand, DiscordMessage, DiscordMessages, DiscordTime } from "@skyra/discord-components-react";

export default function CommandModulesRequiredBotPerms() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="vortexus" ephemeral={true} >
                <DiscordCommand slot="reply" command="/ping" profile="padventures" />
                You are on a cooldown for this command. You may re-use the command <DiscordTime>in 60 seconds</DiscordTime>
            </DiscordMessage>
        </DiscordMessages>
    )
}