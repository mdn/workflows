# markdown-lint

The `markdown-lint` reusable action is located at [`.github/workflows/markdown-lint.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/markdown-lint.yml).

This workflow will use the [`markdownlint-cli`](https://github.com/igorshubovych/markdownlint-cli) to lint markdown files in the target repository. You can use the `paths` filter to only trigger this workflow for specific files or file patterns. More on this in the usage section.

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

#### node-version

The node version to setup and use.

- This `input` is optional, with a default of 16.

#### cache

Which package manager cache to use.

- This `input` is optional, with a default of yarn.

## Usage

### With defaults

```yml
name: markdown-lint

on:
  pull_request:
    branches:
      - main
    paths:
      - "*.md"
      - .github/workflows/markdown-lint.yml

jobs:
  markdown-lint:
    uses: mdn/workflows/.github/workflows/markdown-lint.yml@main
    with:
      target-repo: "mdn/workflows"
```

Above you can see how the [`paths` filter](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore) is being used to specify specific files and file patterns.

### Overriding some defaults

```yml
name: markdown-lint

on:
  pull_request:
    branches:
      - main
    paths:
      - "*.md"
      - .github/workflows/markdown-lint.yml

jobs:
  markdown-lint:
    uses: mdn/workflows/.github/workflows/markdown-lint.yml@main
    with:
      cache: "npm"
      node-version: 18
      target-repo: "mdn/workflows"
```
