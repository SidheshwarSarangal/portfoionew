export function resolveAssetUrl(value: string | undefined) {
  if (!value) return "";
  return value.startsWith("/") ? `${import.meta.env.BASE_URL}${value.slice(1)}` : value;
}
