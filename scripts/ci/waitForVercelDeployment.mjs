import core from '@actions/core'
import github from '@actions/github'
import ß from 'bhala'
import got from 'got'

import waitFor from '../data/helpers/waitFor.mjs'

const { GITHUB_TOKEN } = process.env
const TIMEOUT_IN_SECONDS = 300
let ELAPSED_SECONDS = 0

async function waitForUrl(url) {
  while (ELAPSED_SECONDS < TIMEOUT_IN_SECONDS) {
    try {
      await got.get(url)

      return
    } catch (e) {
      ß.info(`[scripts/ci/waitForVercelDeployment#waitForUrl()] Retrying in 5s...`, 'ℹ️')

      await waitFor(5)
      ELAPSED_SECONDS += 5
    }
  }

  ß.error(`[scripts/ci/waitForVercelDeployment#waitForUrl()] Timeout reached (${TIMEOUT_IN_SECONDS}s).`, '❌')
  ß.error(`[scripts/ci/waitForVercelDeployment#waitForUrl()] Unable to fetch ${url}.`, '❌')
  process.exit(1)
}

// eslint-disable-next-line consistent-return
async function waitForStatus() {
  const { context } = github
  const { owner, repo } = context.repo

  const octokit = github.getOctokit(GITHUB_TOKEN)
  const {
    data: [deployment],
  } = await octokit.rest.repos.listDeployments({
    owner,
    repo,
    sha: context.sha,
  })

  while (ELAPSED_SECONDS < TIMEOUT_IN_SECONDS) {
    const statuses = await octokit.rest.repos.listDeploymentStatuses({
      deployment_id: deployment.id,
      owner,
      repo,
    })

    const status = statuses.data.length > 0 && statuses.data[0]

    if (status.state === 'success') {
      return status
    }

    ß.info(`[scripts/ci/waitForVercelDeployment#waitForUrl()] Retrying in 5s...`, 'ℹ️')

    await waitFor(5)
    ELAPSED_SECONDS += 5
  }

  ß.error(`[scripts/ci/waitForVercelDeployment#waitForStatus()] Timeout reached (${TIMEOUT_IN_SECONDS}s).`, '❌')
  process.exit(1)
}

;(async () => {
  const status = await waitForStatus()
  const deploymentUrl = status.target_url
  core.setOutput('url', deploymentUrl)

  await waitForUrl(deploymentUrl)
})()
