export const ValidateEnv = () => {
    // bot token
    if (!process.env.BOT_TOKEN) {
        console.warn("Missing Discord bot token.");
        return false;
    }

    // all env validated
    return true
};