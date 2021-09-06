export default function convertUsernamesToLink(source) {
  const sourceWithLinkedUsernames = source.replace(/@([0-9a-zA-Z_]+)/g, '<a href="/player/$1">@$1</a>')

  return sourceWithLinkedUsernames
}
