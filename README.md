# workflows

Reusable GitHub Actions workflows.

## Available actions

## auto-merge

The `auto-merge` reusable action is located in `.github/workflows/auto-merge.yml`. To use it you will need a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the following scopes:

- `repo` for private repositories
- `public_repo` for public repositories

In the repository that will call this action, you need to [define a secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) named `GH_TOKEN` with the value of your Personal Access Token.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [dependabot-auto-merge](https://github.com/marketplace/actions/dependabot-auto-merge)

### Usage

In the repository that will call this action, you will need to add a `.github/workflows/auto-merge.yml` file with the following content:

```yml
name: "auto-merge"
on: [pull_request_target]

jobs:
  auto-merge:
    uses:  mdn/workflows/.github/workflows/auto-merge.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

## pr-rebase-needed

The `pr-rebase-needed` reusable action is located in `.github/workflows/pr-rebase-needed.yml`.

This reusable action depends on the following actions:

- [actions-label-merge-conflict](https://github.com/marketplace/actions/label-conflicting-pull-requests)

## Inputs

The action has the following inputs:

### label

If your repository uses a label named anything other than `rebase needed` (for example, [BCD](https://github.com/mdn/browser-compat-data) uses `rebase needed 🚧` -- note the emoji), you can set the label here.

- This `input` is optional with a default of `rebase needed`

### comment

When a rebase is needed, the action will write a comment on the pull request to let the PR author know there are merge conflicts.  This can be changed to whatever the repository desires, or left blank if no comment should be added.

- This `input` is optional with a default of `"This pull request has merge conflicts that must be resolved before we can merge this."`

## Secrets

This action requires the following secrets to be passed by the caller. These need to be set as [environmental secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) using the calling repositories settings.

### GH_TOKEN

Personal access token passed from the caller workflow. Read the documentation on [creating a PA token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/publish-release.yml` file with the following content:

### With defaults

```yml
name: "PR Needs Rebase"

on:
  push:
  pull_request_target:
    types: [synchronize]

jobs:
  pr-needs-rebase:
    uses: mdn/workflows/.github/workflows/pr-needs-rebase.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

### Overriding some defaults

```yml
name: "PR Needs Rebase"

on:
  push:
  pull_request_target:
    types: [synchronize]

jobs:
  pr-needs-rebase:
    uses: mdn/workflows/.github/workflows/pr-needs-rebase.yml@main
    with:
      label: "rebase needed :construction:"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

### Usage

In the repository that will call this action, you will need to add a `.github/workflows/pr-rebase-needed.yml` file with the following content:

```yml
name: "PR Needs Rebase"
on:
 push:
 pull_request_target:
   types: [synchronize]

on:
  workflow_call:
    inputs:
      label:
        description: The label to apply when a rebase is needed
        default: "rebase needed"
        required: false
        type: string
      comment:
        description: The comment to write when a rebase is needed
        default: "This pull request has merge conflicts that must be resolved before we can merge this."
        required: false
        type: string
    secrets:
      GH_TOKEN:
        description: 'Personal access token passed from the caller workflow'
        required: true

jobs:
  label-rebase-needed:
    uses: mdn/workflows/.github/workflows/pr-rebase-needed.yml@main
    with:
      label: "rebase needed :construction:" # Replace with appropriate label
      comment: "This pull request has merge conflicts."

```

## publish-release

The `publish-release` GitHub Action automates publication of a new release on GitHub, updates the changelog and also publishes to the NPM registry.

> NOTE: For the `release-please` workflow to work effectively, you need to follow the conventional commits conventions as [detailed here](https://www.conventionalcommits.org). You can also find additional documentation on the [GitHub Actions README](https://github.com/googleapis/release-please#how-should-i-write-my-commits).

This reusable action depends on the following actions:

- [GoogleCloudPlatform/release-please-action](https://github.com/googleapis/release-please)
- [checkout](https://github.com/marketplace/actions/checkout)
- [actions/setup-node](https://github.com/actions/setup-node)

## Inputs

The action has the following inputs:
### release-type

This is can be one of the release types as [detailed in the release please docs](https://github.com/googleapis/release-please#release-types-supported).

- This `input` is optional with a default of `node`

### node-version

The version of Node.js to use for the release. This action supports all [active and maintenance releases](https://nodejs.org/en/about/releases/) of Node.js.

- This `input` is optional with a default of `12`

### registry-url

The registry to publish to.

- This `input` is optional with a default of `https://registry.npmjs.org`

## Secrets

This action requires the following secrets to be passed by the caller. Both of these need to be set as [environmental secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) using the calling repositories settings.

### GH_TOKEN

Personal access token passed from the caller workflow. Read the documentation on [creating a PA token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

### NPM_AUTH_TOKEN

Authentication token for the NPM registry. Read the documentation for details on [creating a token](https://docs.npmjs.com/creating-and-viewing-access-tokens).

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/publish-release.yml` file with the following content:

### With defaults

```yml
name: publish-release

on:
  push:
    branches:
      - main

jobs:
  publish-release:
    uses:  mdn/workflows/.github/workflows/publish-release.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```

### Overriding some defaults

```yml
name: publish-release

on:
  push:
    branches:
      - main

jobs:
  publish-release:
    uses:  mdn/workflows/.github/workflows/publish-release.yml@main
    with:
      release-type: python
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```
