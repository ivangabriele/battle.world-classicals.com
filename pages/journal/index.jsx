import { promises as fs } from 'fs'
import { globby } from 'globby'
import grayMatter from 'gray-matter'
import moment from 'moment'
import Head from 'next/head'
import path from 'path'

import Main from '../../components/layouts/Main'
import Header from '../../components/sections/Header'
import Journal from '../../components/sections/Journal'

const getDateFromRelativePath = filePath => filePath.match(/^data\/articles\/(\d{4}-\d{2}-\d{2})/)[1]
const getSlugFromRelativePath = filePath => filePath.match(/^data\/articles\/\d{4}-\d{2}-\d{2}-([^.]+)/)[1]

export default function JournalPage({ articles }) {
  return (
    <>
      <Head>
        <title>Journal ● World Classicals Team Battle</title>
        <meta
          content={
            `The World Classicals Team Battle is the biggest classical chess Team Battle on Lichess, ` +
            `gathering more than 150 teams and 700 players from all over the world, each Saturday at 12pm UTC.`
          }
          name="description"
        />
      </Head>

      <Main>
        <Header segment="JOURNAL" title="Recent Articles" />

        <main>
          <Journal articles={articles} />
        </main>
      </Main>
    </>
  )
}

export async function getStaticProps() {
  const articleRelativePaths = await globby('data/articles/*.mdx')

  const articles = await Promise.all(
    articleRelativePaths
      .reverse()
      .slice(0, 11)
      .map(async articleRelativePath => {
        const articleAbsolutePath = path.join(process.cwd(), articleRelativePath)
        const articleSource = await fs.readFile(articleAbsolutePath, 'utf-8')
        const { data } = grayMatter(articleSource)

        const time = getDateFromRelativePath(articleRelativePath)
        const date = moment(time).format('LL')
        const slug = getSlugFromRelativePath(articleRelativePath)
        const id = `${time}-${slug}`

        return {
          date,
          id,
          slug,
          time,
          ...data,
        }
      }),
  )

  return {
    props: {
      articles,
    },
  }
}
