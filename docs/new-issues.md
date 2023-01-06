# new-issues

The `new-issues` reusable action is located at [`.github/workflows/new-issues.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/new-issues.yml).

This reusable action depends on the following actions:

- [andymckay/labeler](https://github.com/marketplace/actions/simple-issue-labeler)

## Inputs

The action has the following inputs:

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on forks of `mdn/workflows`.

- This `input` is required.

### Optional inputs

The action has the following inputs:

#### add-labels

Labels to add as a comma separated list.

- This `input` is optional with a default of `needs-triage`.

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/new-issues.yml` file with the following content:

### With defaults

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

### Overriding some defaults

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
