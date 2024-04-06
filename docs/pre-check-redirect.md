# pre-check-redirect

The `pr-check-redirects` reusable action is located at [`.github/workflows/pr-check-redirects.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/pr-check-redirects.yml).

This workflow uses the Yari [`content validate-redirects`](https://github.com/mdn/content/blob/main/package.json#L13) utility to [validate the redirects file(s)](https://github.com/mdn/yari/blob/main/tool/cli.js#L68). You can use the `paths` filter to trigger this workflow only for specific files or file patterns. More on this in the usage section.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [setup-node](https://github.com/marketplace/actions/setup-node-js-environment)

## Inputs

The action has the following inputs:

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on forks of `mdn/workflows`.

- This `input` is required

### Optional inputs

#### cache

The package manager cache to use.

- This `input` is optional, with the default value `yarn`.

#### node-version

The node version to setup and use.

- This `input` is optional, with the default value `16`.

#### target-locale

The target locale for which to check the redirects file(s).

- This `input` is optional. The default is all locales in the repository.

## Usage

### With defaults

This will run for all locales in the target repository.

```yml
name: check-redirects

on:
  pull_request:
    branches:
      - main
    paths:
      - files/**
      - .github/workflows/pr-check-redirects.yml

jobs:
  check-redirects:
    uses: mdn/workflows/.github/workflows/pr-check-redirects.yml@main
    with:
      target-repo: "mdn/workflows"
```

### Override some defaults

Only run this for the `en-us` locale, using `npm` cache and Nodejs version `18`.

```yml
name: check-redirects

on:
  pull_request:
    branches:
      - main
    paths:
      - files/**
      - .github/workflows/pr-check-redirects.yml

jobs:
  check-redirects:
    uses: mdn/workflows/.github/workflows/pr-check-redirects.yml@main
    with:
      cahce: "npm"
      node-version: 18
      target-locale: "en-us"
      target-repo: "mdn/workflows"
```
