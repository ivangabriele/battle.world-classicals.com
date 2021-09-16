/**
 * Vercel doesn't support Git LFS, therefore this custom build script
 *
 * @see https://github.com/vercel/vercel/discussions/3716
 */

import shelljs from 'shelljs'

const { NODE_ENV, VERCEL, VERCEL_GIT_COMMIT_SHA: GIT_COMMIT_ID } = process.env
const IS_PROD = NODE_ENV === 'production'
const IS_VERCEL = VERCEL !== undefined
const RELEASES_DOWNLOAD_URL = 'https://github.com/ivangabriele/battle.world-classicals.com/releases/download'

function run(command) {
  shelljs.echo(`Running: \`${command}\`…`)
  const output = shelljs.exec(command)

  if (output.code !== 0) {
    shelljs.exit(1)
  }
}

;(() => {
  try {
    if (IS_VERCEL) {
      run(`curl -s -L ${RELEASES_DOWNLOAD_URL}/commit.${GIT_COMMIT_ID}/data.tar.gz -o ./data.tar.gz`)
      run(`curl -s -L ${RELEASES_DOWNLOAD_URL}/commit.${GIT_COMMIT_ID}/public.tar.gz -o ./public.tar.gz`)
      run(`tar -x --file=data.tar.gz`)
      run(`tar -x --file=public.tar.gz`)
    }

    run(`yarn next build`)

    if (IS_PROD) {
      run(`yarn next-sitemap --config next-sitemap.config.js`)
    }
  } catch (err) {
    shelljs.echo(`[scripts/build.js] Error: ${err.message}`)

    shelljs.exit(1)
  }
})()
