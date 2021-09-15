import { existsSync, promises as fs } from 'fs'
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'

async function makeDir(path) {
  if (!existsSync(path)) {
    await fs.mkdir(path, { recursive: true })
  }
}

async function removeDir(path) {
  if (existsSync(path)) {
    await fs.rm(path, { force: true, recursive: true })
  }
}

async function removeFile(path) {
  if (existsSync(path)) {
    await fs.rm(path, { force: true })
  }
}

async function comporess() {
  try {
    await removeDir('./.temp')

    await makeDir('./.temp/public/articles')
    await makeDir('./.temp/public/headers')

    const articleImages = await imagemin(['./public/articles/*.raw.jpg'], {
      destination: './.temp/public/articles',
      plugins: [
        imageminMozjpeg({
          progressive: true,
          quality: 60,
        }),
      ],
    })
    await Promise.all(
      articleImages.map(async ({ destinationPath, sourcePath }) => {
        const newPath = sourcePath.replace(/\.raw/, '')

        await removeFile(newPath)
        await fs.rename(destinationPath, newPath)
      }),
    )

    const headerImages = await imagemin(['./public/headers/*.raw.jpg'], {
      destination: './.temp/public/headers',
      plugins: [
        imageminMozjpeg({
          progressive: true,
          quality: 60,
        }),
      ],
    })
    await Promise.all(
      headerImages.map(async ({ destinationPath, sourcePath }) => {
        const newPath = sourcePath.replace(/\.raw/, '')

        await removeFile(newPath)
        await fs.rename(destinationPath, newPath)
      }),
    )

    const articleImagesLow = await imagemin(['./public/articles/*.raw.jpg'], {
      destination: './.temp/public/articles',
      plugins: [
        imageminMozjpeg({
          progressive: false,
          quality: 10,
        }),
      ],
    })
    await Promise.all(
      articleImagesLow.map(async ({ destinationPath, sourcePath }) => {
        const newPath = sourcePath.replace(/\.raw/, '.low')

        await removeFile(newPath)
        await fs.rename(destinationPath, newPath)
      }),
    )

    const headerImagesLow = await imagemin(['./public/headers/*.raw.jpg'], {
      destination: './.temp/public/headers',
      plugins: [
        imageminMozjpeg({
          progressive: false,
          quality: 10,
        }),
      ],
    })
    await Promise.all(
      headerImagesLow.map(async ({ destinationPath, sourcePath }) => {
        const newPath = sourcePath.replace(/\.raw/, '.low')

        await removeFile(newPath)
        await fs.rename(destinationPath, newPath)
      }),
    )

    await removeDir('./.temp')
  } catch (err) {
    console.error(`[scripts/build/compress()] Error: ${err.message}`)

    process.exit(1)
  }
}

comporess()
