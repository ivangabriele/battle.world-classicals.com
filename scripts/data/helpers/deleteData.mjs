import { promises as fs } from 'fs'

export default async function deleteData(relativePath) {
  const filePath = new URL(`../../../data/${relativePath}`, import.meta.url)

  await fs.unlink(filePath)
}
