import packageJson from "../package.json"

export const APP_NAME = "POS System"
export const APP_VERSION = packageJson.version;
export const APP_TAGLINE = ""
export const APP_DESCRIPTION = packageJson.description;
export const APP_URL = `${process.env.NEXT_PUBLIC_APP_HOST}:${process.env.PORT}/`;
export const API_URL = `${APP_URL}@/`;
export const SESS_ID = `ui`
export const REDIRECT_AFTER_OAUTH = `/`;
export const ADMIN_EMAIL = ``;
// export const GA_MEASUREMENT_ID : string | null = null;
// export const FB_PIXEL_ID : string | null = null;