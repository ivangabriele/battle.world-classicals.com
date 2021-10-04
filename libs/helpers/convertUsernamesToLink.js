export default function convertUsernamesToLink(source) {
  const sourceWithLinkedUsernames = source.replace(
    /@([0-9a-zA-Z_]+)/g,
    '<a href="https://lichess.org/@/$1" target="_blank">@$1</a>',
  )

  return sourceWithLinkedUsernames
}
