import { existsSync, promises as fs } from 'fs'
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import shelljs from 'shelljs'

async function makeDir(path) {
  if (!existsSync(path)) {
    await fs.mkdir(path, { recursive: true })
  }
}

async function removeDir(path) {
  if (!existsSync(path)) {
    await fs.unlink(path, { recursive: true })
  }
}

function run(command) {
  shelljs.echo(`Running: \`${command}\`…`)
  const result = shelljs.exec(command)

  if (result.code !== 0) {
    shelljs.exit(1)
  }
}

async function comporess() {
  try {
    await removeDir('./.temp')

    await makeDir('./.temp/public/articles')
    const articleImages = await imagemin(['./public/articles/*.jpg'], {
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
        await fs.rename(destinationPath, sourcePath.replace(/\.raw/, ''))
      }),
    )

    await makeDir('./.temp/public/headers')
    const headerImages = await imagemin(['./public/headers/*.jpg'], {
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
        await fs.rename(destinationPath, sourcePath.replace(/\.raw/, ''))
      }),
    )

    await removeDir('./.temp')
  } catch (err) {
    shelljs.echo(`[scripts/build/compress()] Error: ${err.message}`)

    shelljs.exit(1)
  }
}

comporess()
