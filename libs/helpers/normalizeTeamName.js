import emojiRegex from 'emoji-regex'

import capitalize from './capitalize'

export default function normalizeTeamName(teamName) {
  const teamNameWithoutEmojis = teamName.replace(emojiRegex(), '')
  const teamNameCapitalized = capitalize(teamNameWithoutEmojis)
  const normalizedTeamName = teamNameCapitalized

  return normalizedTeamName
}
