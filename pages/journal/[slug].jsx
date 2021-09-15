import { promises as fs } from 'fs'
import { globby } from 'globby'
import grayMatter from 'gray-matter'
import moment from 'moment'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import path from 'path'
import css from 'styled-jsx/css'

import Main from '../../components/layouts/Main'
import Header from '../../components/sections/Header'
import Article from '../../components/shared/Article'
import Pararaph from '../../components/shared/Article/Link'
import convertUsernamesToLink from '../../libs/helpers/convertUsernamesToLink'

// const attributionQueryParams = new URLSearchParams([
//   ['utm_source', 'battle.world-classicals.com'],
//   ['utm_medium', 'referral'],
// ]).toString()

const components = {
  a: Pararaph.Link,
  author: Article.Blockquote.Author,
  blockquote: Article.Blockquote,
  p: Article.Pararaph,
}

const getDateFromRelativePath = filePath => filePath.match(/^data\/articles\/(\d{4}-\d{2}-\d{2})/)[1]
const getSlugFromRelativePath = filePath => filePath.match(/^data\/articles\/\d{4}-\d{2}-\d{2}-([^.]+)/)[1]
const matchSlug = slug => filePath => new RegExp(`^data\\/articles\\/\\d{4}-\\d{2}-\\d{2}-${slug}`).test(filePath)

const getMetaDescription = intro => intro.replace(/\n/g, ' ').trim()

export default function BlogArticlePage({ data, source }) {
  const metaTitle = `${data.title} by ${data.author} ● World Classicals Team Battle`
  const metaDescription = getMetaDescription(data.intro)
  const metaImage = `https://battle.world-classicals.com//articles/${data.id}.jpg`
  // const photographerUrl = `https://unsplash.com/@${data.photographer_username}?${attributionQueryParams}`
  // const unsplashUrl = `https://unsplash.com/?${attributionQueryParams}`

  const HeaderStyle = css.resolve`
    header {
      background-image: url('/articles/${data.id}.jpg');
    }
  `

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta content={metaDescription} name="description" />
        <meta content={metaImage} property="og:image" />
        <meta content={metaImage} property="twitter:image" />
      </Head>

      <Main>
        <Header className={HeaderStyle.className} segment="JOURNAL" title={data.title} />

        <main>
          <Article>
            <Article.Intro>{data.intro}</Article.Intro>
            <MDXRemote {...source} components={components} />

            {/* <p>
              Photo by <a href={photographerUrl}>{data.photographer_name}</a> on <a href={unsplashUrl}>Unsplash</a>.
            </p> */}
          </Article>
        </main>
      </Main>

      {HeaderStyle.styles}
    </>
  )
}

export async function getStaticProps(context) {
  const articleRelativePaths = await globby('data/articles/*.mdx')
  const {
    params: { slug },
  } = context

  const articleRelativePath = articleRelativePaths.find(matchSlug(slug))

  const articleAbsolutePath = path.join(process.cwd(), articleRelativePath)
  const articleSource = await fs.readFile(articleAbsolutePath, 'utf-8')
  const { content, data } = grayMatter(articleSource)
  const mdxSource = await serialize(convertUsernamesToLink(content))

  const time = getDateFromRelativePath(articleRelativePath)
  const date = moment(time).format('LL')
  const id = `${time}-${slug}`

  return {
    props: {
      data: {
        date,
        id,
        slug,
        time,
        ...data,
      },
      source: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const articleRelativePaths = await globby('data/articles/*.mdx')

  return {
    fallback: false,
    paths: articleRelativePaths.map(articleRelativePath => ({
      params: {
        slug: getSlugFromRelativePath(articleRelativePath),
      },
    })),
  }
}
