import { promises as fs } from 'fs'
import prettier from 'prettier'

export default async function writeData(relativePath, data, isPublic = false) {
  const dataRootPath = isPublic ? '../../../public/data' : '../../../data'

  const filePath = new URL(`${dataRootPath}/${relativePath}`, import.meta.url)
  const fileSource = JSON.stringify(data)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })

  await fs.writeFile(filePath, fileSourceFormatted)
}
