function normalizeLichessTournamentsList(tournamentsData) {
  if (typeof tournamentsData === 'object') {
    return [tournamentsData]
  }

  if (tournamentsData.length === 0) {
    return []
  }

  return tournamentsData.split(/\n/).reduce((currentArenas, arenaJson) => {
    try {
      currentArenas.push(JSON.parse(arenaJson.trim()))
      // eslint-disable-next-line no-empty
    } catch (err) {}

    return currentArenas
  }, [])
}

module.exports = normalizeLichessTournamentsList
