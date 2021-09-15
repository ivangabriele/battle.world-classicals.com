import { promises as fs } from 'fs'
import { globby } from 'globby'
import grayMatter from 'gray-matter'
import moment from 'moment'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import path from 'path'

import Main from '../../components/layouts/Main'
import Footer from '../../components/sections/Footer'
import Header from '../../components/sections/Header'
import Article from '../../components/shared/Article'
import Pararaph from '../../components/shared/Article/Link'
import convertUsernamesToLink from '../../libs/helpers/convertUsernamesToLink'

// const attributionQueryParams = new URLSearchParams([

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
  const metaTitle = `${data.title} by ${data.author}`
  const metaDescription = getMetaDescription(data.intro)
  const metaImage = `https://battle.world-classicals.com/articles/${data.id}.jpg`

  const backgroundImagePath = `/articles/${data.id}.jpg`

  const attribution = {
    name: data.photographer_name,
    username: data.photographer_username,
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta content={metaDescription} name="description" />
        <meta content={metaImage} property="og:image" />
        <meta content={metaImage} property="twitter:image" />
      </Head>

      <Main>
        <Header backgroundImagePath={backgroundImagePath} segment="JOURNAL" title={data.title} />

        <main>
          <Article>
            <Article.Intro>{data.intro}</Article.Intro>
            <MDXRemote {...source} components={components} />
          </Article>
        </main>

        <Footer attribution={attribution} />
      </Main>
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
