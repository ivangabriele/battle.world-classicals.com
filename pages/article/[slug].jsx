import { promises as fs } from 'fs'
import { globby } from 'globby'
import grayMatter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import path from 'path'

import Main from '../../components/layouts/Main'
import Header from '../../components/sections/Header'
import Article from '../../components/shared/Article'
import Pararaph from '../../components/shared/Article/Link'
import convertUsernamesToLink from '../../libs/helpers/convertUsernamesToLink'

const components = {
  a: Pararaph.Link,
  author: Article.Blockquote.Author,
  blockquote: Article.Blockquote,
  p: Article.Pararaph,
}

const getArticleSlug = fileName => fileName.match(/^data\/articles\/([^.]+)/)[1]

export default function ArticlePage({ data, source }) {
  const metaDescription = ''
  const metaTitle = `${data.title} by ${data.author} ● World Classicals Team Battle`

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta content={metaDescription} name="description" />
      </Head>

      <Main>
        <Header segment="ARTICLE" title={data.title} />

        <main>
          <Article>
            <MDXRemote {...source} components={components} />
          </Article>
        </main>
      </Main>
    </>
  )
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context

  const articlePath = path.join(process.cwd(), `data/articles/${slug}.mdx`)
  const articleSource = await fs.readFile(articlePath, 'utf-8')
  const { content, data } = grayMatter(articleSource)
  const mdxSource = await serialize(convertUsernamesToLink(content))

  return {
    props: {
      data,
      source: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const articleFileNames = await globby('data/articles/*.mdx')

  return {
    fallback: false,
    paths: articleFileNames.map(articleFileName => ({
      params: {
        slug: getArticleSlug(articleFileName),
      },
    })),
  }
}
