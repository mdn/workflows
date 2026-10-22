# auto-rebase

The `auto-rebase` reusable action is located at [`.github/workflows/auto-rebase.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/auto-rebase.yml).

This workflow comments `@dependabot rebase` on an open Dependabot pull request that is behind its base branch and has auto-merge enabled. Pull requests are only behind in repositories that require branches to be up to date before merging, where they would otherwise never auto-merge.

To avoid a wave of CI runs, only the oldest eligible pull request is rebased per run. Each merge to the base branch triggers the next run.

A pull request is skipped when:

- it contains a commit not authored by Dependabot (Dependabot refuses to rebase edited pull requests), or
- a rebase was already requested since the last push to its branch.

GitHub reports a single merge state per pull request. A pull request that is behind but also blocked by a failing required check or a missing required review is reported as blocked rather than behind, and is not rebased.

To use it you will need a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token), such as the one used by [auto-merge](auto-merge.md), with the following scopes:

- `repo` for private repositories
- `public_repo` for public repositories

The token owner needs write access to the repository, because Dependabot ignores commands from other users.

In the repository that will call this action, define a secret named `AUTOMERGE_TOKEN` with the value of your Personal Access Token.

## Usage

The workflow must run when the base branch changes, because that is when pull requests fall behind. Pushes made with the default `GITHUB_TOKEN` (for example by a release workflow) do not trigger it; use `workflow_dispatch` to run it manually in that case. In the repository that will call this action, add a `.github/workflows/auto-rebase.yml` file with the following content:

```yml
name: auto-rebase

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  auto-rebase:
    uses: mdn/workflows/.github/workflows/auto-rebase.yml@main
    if: github.repository_owner == 'mdn'
    secrets:
      GH_TOKEN: ${{ secrets.AUTOMERGE_TOKEN }}
```
