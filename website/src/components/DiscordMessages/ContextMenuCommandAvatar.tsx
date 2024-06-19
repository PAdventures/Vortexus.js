import { DiscordImageAttachment, DiscordCommand, DiscordMessage, DiscordMessages } from "@skyra/discord-components-react";

export default function ContextMenuCommandAvatar() {
    return (
        <DiscordMessages style={{ borderRadius: 6 }}>
            <DiscordMessage profile="vortexus">
                <DiscordCommand slot="reply" command="Avatar" profile="padventures" />
                <DiscordImageAttachment slot="attachments" url="/img/padventures.png" alt="PAdventures Discord Profile Picture" width={250} />
            </DiscordMessage>
        </DiscordMessages>
    )
}