import emojiRegex from 'emoji-regex'

function capitalize(sentence) {
  return sentence
    .toLocaleLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(' ')
}

function cleanEmojis(sentence) {
  return sentence.replace(emojiRegex(), '')
}

function trim(sentence) {
  return sentence.replace(/\s+/, ' ').trim()
}

export default function cleanTeamName(rawName) {
  const nameWithoutEmojis = cleanEmojis(rawName)
  const nameCapitalized = capitalize(nameWithoutEmojis)
  const nameTrimmed = trim(nameCapitalized)
  const name = nameTrimmed

  return name
}
