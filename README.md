# Warrior Cats Wiki — warriorcats.anydaykit.com

The community wiki for **Warrior Cats: Clans of the Forest**, built with the open-source [AnvilWiki](https://github.com/PNGTRID/AnvilWiki) template (Astro 7 + Cloudflare Pages).

**Live site:** [warriorcats.anydaykit.com](https://warriorcats.anydaykit.com/) (mirror: [warriorcats-wiki.pages.dev](https://warriorcats-wiki.pages.dev/))

## What's Here

- **Guides** — getting started, clans overview, combat, the cat creator, game modes
- **Bosses** — predators, rival clan battles
- **Items** — combat moves, crafting and den upgrades

Content is written to the [AnvilWiki content format](https://anvil.wiki/) — every page carries a verified date, a direct-answer summary, and honest sourcing. Unverified details are marked as living pages rather than stated as fact.

## Run Locally

```bash
npx -y pnpm@11.1.1 install
npx -y pnpm@11.1.1 dev        # http://localhost:4321
npx -y pnpm@11.1.1 build      # static output in dist/
npx -y pnpm@11.1.1 check-content
```

## Deploy

```bash
npx -y wrangler@4 pages deploy dist --project-name=warriorcats-wiki --branch=main
```

Production deploys run automatically on push to `main` via GitHub Actions (see `.github/workflows/`).

## License

MIT (site content) — template code © the AnvilWiki authors, also MIT.
