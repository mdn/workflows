# publish-release

The `publish-release` reusable action is located at [`.github/workflows/publish-release.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/publish-release.yml).

The `publish-release` GitHub Action automates publication of a new release on GitHub, updates the changelog and also publishes to the NPM registry.

> NOTE: For the `release-please` workflow to work effectively, you need to follow the conventional commits conventions as [detailed here](https://www.conventionalcommits.org). You can also find additional documentation on the [GitHub Actions README](https://github.com/googleapis/release-please#how-should-i-write-my-commits).

This reusable action depends on the following actions:

- [GoogleCloudPlatform/release-please-action](https://github.com/googleapis/release-please)
- [checkout](https://github.com/marketplace/actions/checkout)
- [actions/setup-node](https://github.com/actions/setup-node)

## Inputs

The action has the following inputs:

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on forks of `mdn/workflows`.

- This `input` is required.

### Optional inputs

#### release-type

This is can be one of the release types as [detailed in the release please docs](https://github.com/googleapis/release-please#release-types-supported).

- This `input` is optional with a default of `node`

#### node-version

The version of Node.js to use for the release. This action supports all [active and maintenance releases](https://nodejs.org/en/about/releases/) of Node.js.

- This `input` is optional with a default of `20`

#### npm-publish

Whether to publish the package to the NPM registry.

- This `input` is optional with a default of `true`

#### npm-publish-args

Arguments to pass to the `npm publish` command. This is ignored if `npm-publish` is set to `false`.

- This `input` is optional with a default of an empty string

#### registry-url

The registry to publish to.

- This `input` is optional with a default of `https://registry.npmjs.org`

## Secrets

This action requires the following secrets to be passed by the caller. Both of these need to be set as [environmental secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) using the calling repositories settings.

### GH_TOKEN

Personal access token passed from the caller workflow. Read the documentation on [creating a PA token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

### NPM_AUTH_TOKEN

Authentication token for the NPM registry. Read the documentation for details on [creating a token](https://docs.npmjs.com/creating-and-viewing-access-tokens).

> NOTE: When skipping NPM publishing, this token is not required.

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
    uses: mdn/workflows/.github/workflows/publish-release.yml@main
    with:
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```

#### Overriding some defaults

```yml
name: publish-release

on:
  push:
    branches:
      - main

jobs:
  publish-release:
    uses: mdn/workflows/.github/workflows/publish-release.yml@main
    with:
      release-type: python
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
      NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```

### Skip NPM publishing

```yml
name: publish-release

on:
  push:
    branches:
      - main

jobs:
  publish-release:
    uses: mdn/workflows/.github/workflows/publish-release.yml@main
    with:
      npm-publish: false
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```
