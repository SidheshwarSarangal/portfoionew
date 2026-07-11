const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

export function safeWebUrl(value: string | undefined, fallback = "") {
  if (!value) return fallback;
  if (value.startsWith("/")) return value;

  try {
    const url = new URL(value);
    return HTTP_PROTOCOLS.has(url.protocol) ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export function safeContactUrl(value: string, fallback = "") {
  if (value.startsWith("mailto:")) {
    const address = value.slice(7).split("?")[0];
    return isEmail(address) ? `mailto:${address}` : fallback;
  }
  return safeWebUrl(value, fallback);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function requirePublicHttpUrl(value: string, name: string) {
  const safeValue = safeWebUrl(value);
  if (!safeValue || safeValue.startsWith("/")) {
    throw new Error(`${name} must be a public HTTP or HTTPS URL.`);
  }
  return safeValue;
}
