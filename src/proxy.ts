import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    // og / icon / apple-icon are excluded: they are route handlers and
    // metadata files, not pages. Without this the locale proxy rewrites
    // /og -> /en/og and /apple-icon -> /en/apple-icon, which 404 — that
    // silently broke every social share card, structured-data image and
    // touch icon on the site.
    "/((?!api|og|icon|apple-icon|_next|_vercel|.*\\..*).*)",
  ],
};
