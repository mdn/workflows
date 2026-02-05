# auto-merge

The `auto-merge` reusable action is located at [`.github/actions/auto-merge.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/auto-merge.yml).

This workflow approves Dependabot pull requests that are _eligible_ (non-breaking, no maintainer changes), and auto-merges them when all _required_ checks pass.

To use it you will need a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the following scopes:

- `repo` for private repositories
- `public_repo` for public repositories

> NOTE: This action only processes pull requests opened by [Dependabot](https://github.com/dependabot).

In the repository that will call this action, you need to [define a secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) named `GH_TOKEN` with the value of your Personal Access Token.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [fetch-metadata](https://github.com/marketplace/actions/fetch-metadata)

## Eligibility

A pull request is considered _eligible_ for auto-approve/merge if it is **not** a breaking change. Per [semantic versioning](https://semver.org/), the following are considered breaking:

- Major version updates (e.g., `1.x.x` → `2.x.x`)
- Minor version updates for `0.x` versions (e.g., `0.1.x` → `0.2.x`)
- Patch version updates for `0.0.x` versions (e.g., `0.0.1` → `0.0.2`)
- Any update where the package maintainer has changed

## Inputs

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the workflow from running on forks of `mdn/workflows`.

- This `input` is required

### Optional inputs

The action has the following optional inputs:

#### auto-approve

Approve eligible pull requests (no breaking changes, no maintainer changes).

- This `input` is optional with a default of `true`.

#### auto-merge (input)

Merge eligible pull requests (when all required checks pass).

- This `input` is optional with a default of `false`.

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/auto-merge.yml` file with the following content:

### With defaults (auto-approve only)

```yml
name: "auto-merge"
on: [pull_request_target]

jobs:
  auto-merge:
    uses: mdn/workflows/.github/workflows/auto-merge.yml@main
    with:
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

### With auto-merge enabled

```yml
name: "auto-merge"
on: [pull_request_target]

jobs:
  auto-merge:
    uses: mdn/workflows/.github/workflows/auto-merge.yml@main
    with:
      auto-merge: true
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```
