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

### Inputs
### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required
### Optional inputs

The action has the following optional inputs:

#### auto-approve

Automatically approve pull-requests.

- This `input` is optional with a default of `true`.

#### command

The command to pass to Dependabot.

- This `input` is optional with a default of `squash and merge`.

#### target

The version comparison target. One off major, minor, or patch.

- This `input` is optional with a default of `minor`.

### Usage

In the repository that will call this action, you will need to add a `.github/workflows/auto-merge.yml` file with the following content:

#### With defaults

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

#### Overriding some defaults

```yml
name: "auto-merge"
on: [pull_request_target]

jobs:
  auto-merge:
    uses: mdn/workflows/.github/workflows/auto-merge.yml@main
    with:
      auto-approve: false
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

## pr-rebase-needed

The `pr-rebase-needed` reusable action is located in `.github/workflows/pr-rebase-needed.yml`.

This reusable action depends on the following actions:

- [actions-label-merge-conflict](https://github.com/marketplace/actions/label-conflicting-pull-requests)

### Inputs

The action has the following inputs:
### Required inputs
#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required.

### Optional inputs
#### label

If your repository uses a label named anything other than `rebase needed 🚧` (for example, the repository may use `merge conflicts`), you can set the label here.

- This `input` is optional with a default of `rebase needed :construction:`

#### comment

When a rebase is needed, the action will write a comment on the pull request to let the PR author know there are merge conflicts. This can be changed to whatever the repository desires, or left blank if no comment should be added.

- This `input` is optional with a default of `This pull request has merge conflicts that must be resolved before it can be merged.`

### Secrets

This action requires the following secrets to be passed by the caller. These need to be set as [environmental secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) using the calling repositories settings.

#### GH_TOKEN

Personal access token passed from the caller workflow. Read the documentation on [creating a PA token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

### Usage

In the repository that will call this action, you will need to add a `.github/workflows/pr-rebase-needed.yml` file with the following content:

#### With defaults

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
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

#### Overriding some defaults

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
      comment: "This pull requests has merge conflicts that needs to be resolved before being merged. Thank you."
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

## idle

The `idle` reusable action is located in `.github/workflows/idle.yml`.

> **NOTE:** We currently use this action to label issues only. We do not automatically close issues or pull requests using this action.

This reusable action depends on the following actions:

- [stale](https://github.com/marketplace/actions/close-stale-issues)

### Inputs

The action has the following inputs:
### Required inputs
#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required.

### Optional inputs

#### days-before-close

If set to a non-negative number, issues and pull requests with the idle label will automatically be closed after the set number of days.

- This `input` is optional with a default of -1

#### label

If your repository uses a label named anything other than `🐌 idle` (for example, the repository may want to use use `stale`), you can set the label here.

- This `input` is optional with a default of `🐌 idle`

#### stale-days

The number of days before the issue or pull request is considered idle and the label and/or comment is applied.

- This `input` is optional with a default of 37

### Usage

In the repository that will call this action, you will need to add a `.github/workflows/mark-as-idle.yml` file with the following content:

#### With defaults

```yml
name: "Label Idle Issues"

on:
  push:
  pull_request_target:
    types: [synchronize]

jobs:
  mark-as-idle:
    uses: mdn/workflows/.github/workflows/mark-as-idle.yml@main
    with:
      target-repo: "mdn/workflows"
```

#### Overriding some defaults

```yml
name: "Label Idle Issues"

on:
  push:
  pull_request_target:
    types: [synchronize]

jobs:
  mark-as-idle:
    uses: mdn/workflows/.github/workflows/mark-as-idle.yml@main
    with:
      label: "stale"
      target-repo: ${{ input.target_repo }}
```

## lock-closed

The `lock-closed` GitHub Action automatically locks issues and PRs that have been closed for more than a year.
It is intended to reduce "necrobumping" (the addition of comments, including spam, to old/closed issues).

This reusable action depends on the following actions:

- [dessant/lock-threads@v3](https://github.com/dessant/lock-threads)

### Inputs

The action has the following inputs:
### Required inputs
#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required.

### Optional inputs

#### issue-inactive-days

The number of days before an issue is considered inactive.

- This `input` is optional with a default of 365
### Usage

In the repository that will call this action, you will need to add a `.github/workflows/lock-closed.yml` file with the following content:

#### With defaults

```yml
name: "Lock inactive issues and pull requests"

on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  lock-closed:
    uses: mdn/workflows/.github/workflows/lock-closed.yml@main
    with:
      target-repo: "mdn/workflows"
```

#### Overriding default inactive days

```yml
name: "Lock inactive issues and pull requests"

on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  lock-closed:
    uses: mdn/workflows/.github/workflows/lock-closed.yml@main
    with:
      issue-inactive-days: 42
      target-repo: "mdn/workflows"
```

## publish-release

The `publish-release` GitHub Action automates publication of a new release on GitHub, updates the changelog and also publishes to the NPM registry.

> NOTE: For the `release-please` workflow to work effectively, you need to follow the conventional commits conventions as [detailed here](https://www.conventionalcommits.org). You can also find additional documentation on the [GitHub Actions README](https://github.com/googleapis/release-please#how-should-i-write-my-commits).

This reusable action depends on the following actions:

- [GoogleCloudPlatform/release-please-action](https://github.com/googleapis/release-please)
- [checkout](https://github.com/marketplace/actions/checkout)
- [actions/setup-node](https://github.com/actions/setup-node)

### Required inputs

The action has the following inputs:

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required.

### Optional inputs

#### release-type

This is can be one of the release types as [detailed in the release please docs](https://github.com/googleapis/release-please#release-types-supported).

- This `input` is optional with a default of `node`

#### node-version

The version of Node.js to use for the release. This action supports all [active and maintenance releases](https://nodejs.org/en/about/releases/) of Node.js.

- This `input` is optional with a default of `12`

#### npm-publish

Whether to publish the package to the NPM registry.

- This `input` is optional with a default of `true`

#### npm-publish-args

Arguments to pass to the `npm publish` command. This is ignored if `npm-publish` is set to `false`.

- This `input` is optional with a default of an empty string

#### registry-url

The registry to publish to.

- This `input` is optional with a default of `https://registry.npmjs.org`

### Secrets

This action requires the following secrets to be passed by the caller. Both of these need to be set as [environmental secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) using the calling repositories settings.

#### GH_TOKEN

Personal access token passed from the caller workflow. Read the documentation on [creating a PA token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

#### NPM_AUTH_TOKEN

Authentication token for the NPM registry. Read the documentation for details on [creating a token](https://docs.npmjs.com/creating-and-viewing-access-tokens).

> NOTE: When skipping NPM publishing, this token is not required.

### Usage

In the repository that will call this action, you will need to add a `.github/workflows/publish-release.yml` file with the following content:

#### With defaults

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

#### Skip NPM publishing

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

## new-issues

The `new-issues` reusable action is located in `.github/workflows/new-issues.yml`.

This reusable action depends on the following actions:

- [andymckay/labeler](https://github.com/marketplace/actions/simple-issue-labeler)

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required.

### Optional inputs

The action has the following inputs:

#### add-labels

Labels to add as a comma separated list.

- This `input` is optional with a default of `needs-triage`.
### Usage

In the repository that will call this action, you will need to add a `.github/workflows/new-issues.yml` file with the following content:

#### With defaults

```yml
name: "Mark new issues with specified label(s)"

on:
  issues:
    types:
      - reopened
      - opened

jobs:
  label-new-issues:
    uses: mdn/workflows/.github/workflows/new-issues.yml@main
      with:
        target-repo: "mdn/workflows"
```

#### Overriding some defaults

```yml
name: "Mark new issues with specified label(s)"

on:
  issues:
    types:
      - reopened
      - opened

jobs:
  label-new-issues:
    uses: mdn/workflows/.github/workflows/new-issues.yml@main
      with:
        add-labels: "triage, bug"
        target-repo: "mdn/workflows"
```

## set-default-labels

The `set-default-labels` reusable action is located in `.github/workflows/set-default-labels.yml`.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [lannonbr/issue-label-manager-action](https://github.com/marketplace/actions/issue-label-manager-action)

### Required inputs

The action has the following inputs:
#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required. (`type:string`)

### Optional inputs
#### should-delete-labels

This is an optional `boolean` input that is `false` by default. If set to `true`, the action will delete any existing labels that are not listed in the JSON file mentioned previously.

### Usage

In the repository that will call this action, you will need to create the following file: `.github/labels.json`. The content of the file can be something like the following:

```json
[
  {
    "name": "bug",
    "color": "#d73a4a",
    "description": "something isn’t working"
  },
  {
    "name": "chore",
    "color": "#fef2c0",
    "description": "keeping the lights on"
  }
]
```

You can find more details about the above on the [issue-label-manager-action documentation](https://github.com/marketplace/actions/issue-label-manager-action#issue-label-manager-action). The next item you need to create in the repository that will call this action, is a workflow file. You can name the file `.github/workflows/set-default-labels.yml` and add the following content:

#### With defaults

```yml
name: set-default-labels
on: [workflow_dispatch]

jobs:
  set-default-labels:
    uses: mdn/workflows/.github/workflows/set-default-labels.yml@main
    with:
      target-repo: "mdn/workflows"
```

#### Overriding some defaults

```yml
name: set-default-labels
on: [workflow_dispatch]

jobs:
  set-default-labels:
    uses: mdn/workflows/.github/workflows/set-default-labels.yml@main
    with:
      target-repo: "mdn/workflows"
      should-delete-labels: true
```

Because of the nature of this action, it must be run manually. You can learn more about [manually running actions on GitHub](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow).

## json-lint

The `json-lint` reusable action is located in `.github/workflows/json-lint.yml`. This workflow will use [`eslint`](https://eslint.org/) to lint JSON files in the target repository. You can use the `paths` filter to only trigger this workflow for specific files or file patterns. More on this in the usage section.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [setup-node](https://github.com/marketplace/actions/setup-node-js-environment)

### Inputs

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required

### Optional inputs

#### node-version

The node version to setup and use.

- This `input` is optional, with a default of 16.

#### cache

Which package manager cache to use.

- This `input` is optional, with a default of yarn.

### Usage

#### With defaults

```yml
name: json-lint

on:
  pull_request:
    branches:
      - main
    paths:
      - '*.json'
      - .github/workflows/json-lint.yml

jobs:
  json-lint:
    uses: mdn/workflows/.github/workflows/json-lint.yml@main
    with:
      target-repo: "mdn/workflows"
```

Above you can see how the [`paths` filter](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore) is being used to specify specific files and file patterns.

#### Overriding some defaults

```yml
name: json-lint

on:
  pull_request:
    branches:
      - main
    paths:
      - '*.json'
      - .github/workflows/json-lint.yml

jobs:
  json-lint:
    uses: mdn/workflows/.github/workflows/json-lint.yml@main
    with:
      cache: "npm"
      node-version: 18
      target-repo: "mdn/workflows"
```

## markdown-lint

The `markdown-lint` reusable action is located in `.github/workflows/markdown-lint.yml`. This workflow will use the [`markdownlint-cli`](https://github.com/igorshubovych/markdownlint-cli) to lint markdown files in the target repository. You can use the `paths` filter to only trigger this workflow for specific files or file patterns. More on this in the usage section.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [setup-node](https://github.com/marketplace/actions/setup-node-js-environment)

### Inputs

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required

### Optional inputs

#### node-version

The node version to setup and use.

- This `input` is optional, with a default of 16.

#### cache

Which package manager cache to use.

- This `input` is optional, with a default of yarn.

### Usage

#### With defaults

```yml
name: markdown-lint

on:
  pull_request:
    branches:
      - main
    paths:
      - '*.md'
      - .github/workflows/markdown-lint.yml

jobs:
  markdown-lint:
    uses: mdn/workflows/.github/workflows/markdown-lint.yml@main
    with:
      target-repo: "mdn/workflows"
```

Above you can see how the [`paths` filter](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore) is being used to specify specific files and file patterns.

#### Overriding some defaults

```yml
name: markdown-lint

on:
  pull_request:
    branches:
      - main
    paths:
      - '*.md'
      - .github/workflows/markdown-lint.yml

jobs:
  markdown-lint:
    uses: mdn/workflows/.github/workflows/markdown-lint.yml@main
    with:
      cache: "npm"
      node-version: 18
      target-repo: "mdn/workflows"
```

## pre-check-redirect

The `pre-check-redirect` reusable action is located in `.github/workflows/pre-check-redirect.yml`. This workflow uses the Yari [`content validate-redirects`](https://github.com/mdn/content/blob/main/package.json#L13) utility to [validate the redirects file(s)](https://github.com/mdn/yari/blob/main/tool/cli.js#L68). You can use the `paths` filter to only trigger this workflow for specific files or file patterns. More on this in the usage section.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [setup-node](https://github.com/marketplace/actions/setup-node-js-environment)

### Inputs

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on `fork/workflows`.

- This `input` is required

### Optional inputs

#### cache

Which package manager cache to use.

- This `input` is optional, with a default of yarn.

#### node-version

The node version to setup and use.

- This `input` is optional, with a default of 16.

#### target-locale

The target locale for which to check the redirects file(s).

- This `input` is optional, with a default of all locales in the repository.

### Usage

#### With defaults

This will run for all locales in the target repository.

```yml
name: check-redirects

on:
  pull_request:
    branches:
      - main
    paths:
      - files/**
      - .github/workflows/pr-check_redirects.yml

jobs:
  check-redirects:
    uses: mdn/workflows/.github/workflows/pre-check-redirects.yml@main
    with:
      target-repo: "mdn/workflows"
```

#### Override some defaults

Only run this for the `en-us` locale, using `npm` cache and Nodejs version `18`.

```yml
name: check-redirects

on:
  pull_request:
    branches:
      - main
    paths:
      - files/**
      - .github/workflows/pr-check_redirects.yml

jobs:
  check-redirects:
    uses: mdn/workflows/.github/workflows/pre-check-redirects.yml@main
    with:
      cahce: "npm"
      node-version: 18
      target-locale: "en-us"
      target-repo: "mdn/workflows"
```
