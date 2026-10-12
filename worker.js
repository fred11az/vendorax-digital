const SUPPORTED = ["fr", "en", "de", "pl", "sv", "it", "pt", "nl", "es"];

function preferredLanguage(request) {
  const cookie = request.headers.get("cookie") || "";
  const saved = cookie.match(/(?:^|; )vxlang=([a-z]{2})/);
  if (saved && SUPPORTED.includes(saved[1])) return saved[1];

  const accept = request.headers.get("accept-language") || "";
  for (const part of accept.split(",")) {
    const code = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (SUPPORTED.includes(code)) return code;
  }
  return "en";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return Response.redirect(new URL(`/${preferredLanguage(request)}/`, url), 302);
    }
    return env.ASSETS.fetch(request);
  },
};
