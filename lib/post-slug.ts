export function normalizePostSlug(input: string): string | null {
  const decoded = decodeURIComponent(String(input || "")).trim();
  const segments = decoded.split("/").filter(Boolean);

  if (segments.some((segment) => segment === "." || segment === "..")) {
    return null;
  }

  if (segments.slice(0, -1).some((segment) => !/^[a-z0-9-]+$/i.test(segment))) {
    return null;
  }

  const lastSegment = segments.at(-1) || decoded;
  const baseName = lastSegment.replace(/\.md$/i, "");

  if (!baseName || !/^[a-z0-9-]+$/i.test(baseName)) {
    return null;
  }

  return baseName;
}
