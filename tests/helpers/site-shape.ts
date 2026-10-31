/**
 * Repo-shape detection for the test suite — lets contract tests distinguish
 * the shipped demo repo from a rebranded fork so each can gate honestly.
 *
 * A fork (apply-template rebrand) differs from the demo repo in ways that
 * are BY DESIGN, not regressions:
 *   - demo identity gone (site.ts carries the fork's own game/domain),
 *   - demo locales/articles/public files removed,
 *   - the landing layer removed (landingLinkEnabled = false),
 *   - the wrangler.toml FORKER warning block consumed.
 * Tests that pin the demo repo's exact shape must skip on forks instead of
 * going permanently red — a red gate that can never go green teaches people
 * to ignore CI (and blocks CI-gated automation like the IndexNow workflow).
 *
 * Detection reuses the framework's own single-source identity parse
 * (isDemoSiteTsIdentity) — the same marker apply-template trusts — rather
 * than inventing a second definition of "demo".
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDemoSiteTsIdentity, parseSiteTsIdentity } from '../../scripts/lib/apply-rewrites';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

let forkCached: boolean | null = null;

/** True when the repo has been rebranded away from the shipped demo identity. */
export function isForkSite(): boolean {
  if (forkCached === null) {
    const raw = readFileSync(join(ROOT, 'src/config/site.ts'), 'utf8');
    const id = parseSiteTsIdentity(raw);
    forkCached = id === null || !isDemoSiteTsIdentity(id);
  }
  return forkCached;
}

let landingCached: boolean | null = null;

/** True when the landing layer ships (demo repo). Forks remove it via apply-template. */
export function hasLanding(): boolean {
  if (landingCached === null) {
    landingCached = existsSync(join(ROOT, 'src/components/landing/LandingLayout.astro'));
  }
  return landingCached;
}
