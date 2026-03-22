/** Production domain used for all deep links and share URLs */
export const SHARE_DOMAIN = "https://discoverseai.com";

/** Build a shareable URL for a given path */
export const shareUrl = (path: string) => `${SHARE_DOMAIN}${path}`;
