module.exports = async function waitFor(inS) {
  return new Promise(resolve => {
    setTimeout(resolve, inS * 1000)
  })
}
