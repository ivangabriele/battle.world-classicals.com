import emojiRegex from 'emoji-regex'

function capitalize(sentence) {
  return sentence
    .toLocaleLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(' ')
}

function cleanNonLetterChars(sentence) {
  return sentence.replace(/[❤♟,_]/g, ' ')
}

function cleanEmojis(sentence) {
  return sentence.replace(emojiRegex(), ' ')
}

function cleanParentheses(sentence) {
  return sentence.replace(/\([^(]*\)/g, ' ')
}

function trim(sentence) {
  return sentence.replace(/\s+/g, ' ').trim()
}

export default function cleanTeamName(rawName) {
  const nameWithoutEmojis = cleanEmojis(rawName)
  const nameWithoutNonLetterChars = cleanNonLetterChars(nameWithoutEmojis)
  const nameWithoutParentheses = cleanParentheses(nameWithoutNonLetterChars)
  const nameCapitalized = capitalize(nameWithoutParentheses)
  const nameTrimmed = trim(nameCapitalized)
  const name = nameTrimmed

  return name
}
