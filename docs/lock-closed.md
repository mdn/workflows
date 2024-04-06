# lock-closed

The `lock-closed` workflow is located at [`.github/workflows/lock-closed.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/lock-closed.yml).

The `lock-closed` GitHub Action automatically locks issues and PRs that have been closed for more than a year.
It is intended to reduce "necrobumping" (the addition of comments, including spam, to old/closed issues).

This reusable action depends on the following actions:

- [dessant/lock-threads@v3](https://github.com/dessant/lock-threads)

## Inputs

The action has the following inputs:

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on forks of `mdn/workflows`.

- This `input` is required.

### Optional inputs

#### issue-inactive-days

The number of days before an issue is considered inactive.

- This `input` is optional with a default of 365

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/lock-closed.yml` file with the following content:

### With defaults

```yml
name: "Lock inactive issues and pull requests"

on:
  schedule:
    - cron: "0 * * * *"
  workflow_dispatch:

jobs:
  lock-closed:
    uses: mdn/workflows/.github/workflows/lock-closed.yml@main
    with:
      target-repo: "mdn/workflows"
```

### Overriding default inactive days

```yml
name: "Lock inactive issues and pull requests"

on:
  schedule:
    - cron: "0 * * * *"
  workflow_dispatch:

jobs:
  lock-closed:
    uses: mdn/workflows/.github/workflows/lock-closed.yml@main
    with:
      issue-inactive-days: 42
      target-repo: "mdn/workflows"
```
