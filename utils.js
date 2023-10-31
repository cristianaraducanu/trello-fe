export function getAvatarInitials(name) {
  if (!name) return;
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
