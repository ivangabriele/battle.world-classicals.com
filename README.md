# World Classicals Team Battle Website

The [World Classicals Team Battle][link-wctb] (WCTB) is the biggest [Lichess][link-lichess] Classical Chess (time
control >= 20') Team Battle.

I created this website to gather in one place all participating teams and players data
related to this tournament. It incidentally offers fancy statistics that are not available on Lichess.

The source code is shared to potentially help other teams and Team Battle organizers to improve their venue. It's not
the cleanest source code since it's a volunteer side-project, but it's perfectly usable as a starting point for any
developer at ease with Javascript, React and eventually [Next.js](https://nextjs.org).

Note that you must also make your source code available if you use this source code (see [License](#license)).

- [Developers](#developers)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Install](#install)
  - [Run a local instance](#run-a-local-instance)
  - [Lint](#lint)
  - [Run a production instance](#run-a-production-instance)
  - [Recommended Visual Studio Code settings](#recommended-visual-studio-code-settings)
- [License](#license)

## Developers

### Getting started

#### Prerequisites

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com/getting-started/install)

#### Install

```sh
git clone https://github.com/ivangabriele/battle.world-classicals.com.git
cd battle.world-classicals.com
yarn
```

### Run a local instance

```sh
yarn dev
```

The development build should now run on http://localhost:3000, automatically re-hydrating pages on each file change.

### Lint

```sh
yarn lint
```

My custom Prettier / ESLint rules are quite opinionated, feel free to change them to your preferences

### Run a production instance

```sh
yarn
yarn build --production
yarn start # or yarn start -p 1234 to specify the port
```

### Recommended Visual Studio Code settings

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "eslint.codeActionsOnSave.mode": "all",
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "eslint.format.enable": true,
  "eslint.packageManager": "yarn",
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## License

World Classicals Team Battle website source code is free, and distributed under the **GNU Affero General Public License
v3.0 or later** (AGPL v3.0 or later).

Essentially, this means that you are free to do almost exactly what you want with the website, including distributing it
among your friends, making it available for download from your website, selling it (either by itself or as part of some
bigger package), or using it as the starting point for a website project of your own.

The only real limitation is that whenever you distribute World Classicals Team Battle website in some way, **you must
always include the full source code**, or a pointer to where the source code can be found. If you make any changes to
the source code, **these changes must also be made available under the GPL**.

For full details, [read the copy of the AGPL v3.0 or later found in the file named _LICENSE.md_][link-license].

---

[link-license]: https://github.com/ivangabriele/battle.world-classicals.com/blob/main/LICENSE.md
[link-lichess]: https://lichess.org
[link-wctb]: https://battle.world-classicals.com
