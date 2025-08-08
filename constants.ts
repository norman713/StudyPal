//Authentication constants

export const COOKIE_NAME="auth_token";
export const REFRESH_COOKIE_NAME="refresh_token";
export const COOKIE_MAX_AGE=20; //20 seconds
export const JWT_EXPIRATION_TIME="20s";
export const REFRESH_TOKEN_EXPIRY="30d";
export const REFRESH_TOKEN_MAX_AGE=30*24*60*60;

//refresh token constant
export const REFRESH_BEFORE_EXPIRY_SEC=60;

//google OAuth constants

export const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URL=`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/callback`;
export const GOOGLE_AUTH_URL="https://accounts.google.com/o/oauth2/v2/auth";

//environment constants
export const BASE_URL=process.env.EXPO_PUBLIC_BASE_URL;
export const APP_SCHEME=process.env.EXPO_PUBLIC_SCHEME;
export const JWT_SECRET= process.env.JWT_SECRET!;

//cookie settings
export const COOKIE_OPTIONS={
    httpOnly:true,
    secure:true,
    sameSite:"Lax" as const,
    path:"/",
    maxAge:COOKIE_MAX_AGE,
}

export const REFRESH_COOKIE_OPTION={
    httpOnly: true,
    secure:true,
    sameSite:"Lax" as const,
    path:"/api/auth/refresh", // restrict to refresh endpoint only
    maxAge:REFRESH_TOKEN_MAX_AGE,
}

