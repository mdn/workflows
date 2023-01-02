# idle

The `idle` reusable action is located at [`.github/workflows/idle.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/idle.yml).

> **NOTE:** We currently use this action to label issues only. We do not automatically close issues or pull requests using this action.

This reusable action depends on the following actions:

- [stale](https://github.com/marketplace/actions/close-stale-issues)

## Inputs

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on forks of `mdn/workflows`.

- This `input` is required.

### Optional inputs

#### days-before-close

If set to a non-negative number, issues and pull requests with the idle label will automatically be closed after the set number of days.

- This `input` is optional with a default of -1

#### label

If your repository uses a label named anything other than `idle` (for example, the repository may want to use use `stale`), you can set the label here.

- This `input` is optional with a default of `idle`

#### stale-days

The number of days before the issue or pull request is considered idle and the label and/or comment is applied.

- This `input` is optional with a default of 30

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/mark-as-idle.yml` file with the following content:

### With defaults

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

### Overriding some defaults

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
