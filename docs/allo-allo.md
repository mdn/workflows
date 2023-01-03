# Allo-Allo

The `Allo-Allo` reusable action is located at [`.github/workflows/allo-allo.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/allo-allo.yml).

This workflow is added to repositories to welcome new contributors and congratulate them on their first successful pull request merge.
You can specify all three inputs or a single input depending on your needs.

This reusable action depends on the following actions:

- [Allo-Allo](https://github.com/mechanical-ink/allo-allo)

## Inputs

The action has the following inputs:

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on forks of `mdn/workflows`.

- This `input` is required

### Optional inputs

#### issue-welcome

Message to show to a contributor opening their first issue.

- This `input` is optional.

#### pr-welcome

Message to show to a contributor opening their first pull request.

- This `input` is optional.

#### pr-merged

Message to show to a contributor after first merged pull request.

- This `input` is optional.

## Usage

The following will run on first issue creation, first opened pull request, and first merged pull request.

```yml
name: "AlloAllo"

on:
  issues:
    types:
      - opened
  pull_request_target:
    branches:
      - main
    types:
      - opened
      - closed

jobs:
  allo-allo:
    uses: mdn/workflows/.github/workflows/allo-allo.yml@main
    with:
      target-repo: "mdn/workflows"
      issue-welcome: |
        It looks like this is your first issue. Welcome! 👋
        One of the project maintainers will be with you as soon as possible. We
        appreciate your patience. To safeguard the health of the project, please
        take a moment to read our [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
      pr-welcome: |
        It looks like this is your first pull request. 🎉
        Thank you for your contribution! One of the project maintainers will triage
        and assign the pull request for review. We appreciate your patience. To
        safeguard the health of the project, please take a moment to read our
        [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
      pr-merged: |
        Congratulations on your first merged pull request. 🎉 Thank you for your contribution!
        Did you know we have a [project board](https://github.com/orgs/mdn/projects/25) with high-impact contribution opportunities?
        We look forward to your next contribution.
```

### Comment on first issue

The following will run on first issue creation.

```yml
name: "AlloAllo"

on:
  issues:
    types:
      - opened

jobs:
  allo-allo:
    uses: mdn/workflows/.github/workflows/allo-allo.yml@main
    with:
      target-repo: "mdn/workflows"
      issue-welcome: |
        It looks like this is your first issue. Welcome! 👋
        One of the project maintainers will be with you as soon as possible. We
        appreciate your patience. To safeguard the health of the project, please
        take a moment to read our [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
```

### Comment on first pull request

The following will run on first opened pull request.

```yml
name: "AlloAllo"

on:
  pull_request_target:
    branches:
      - main
    types:
      - opened

jobs:
  allo-allo:
    uses: mdn/workflows/.github/workflows/allo-allo.yml@main
    with:
      target-repo: "mdn/workflows"
      pr-welcome: |
        It looks like this is your first pull request. 🎉
        Thank you for your contribution! One of the project maintainers will triage
        and assign the pull request for review. We appreciate your patience. To
        safeguard the health of the project, please take a moment to read our
        [code of conduct](../blob/main/CODE_OF_CONDUCT.md).
```

### Comment on first merged pull request

The following will run on the first merged pull request.

```yml
name: "AlloAllo"

on:
  pull_request_target:
    branches:
      - main
    types:
      - closed

jobs:
  allo-allo:
    uses: mdn/workflows/.github/workflows/allo-allo.yml@main
    with:
      target-repo: "mdn/workflows"
      pr-merged: |
        Congratulations on your first merged pull request. 🎉 Thank you for your contribution!
        Did you know we have a [project board](https://github.com/orgs/mdn/projects/25) with high-impact contribution opportunities?
        We look forward to your next contribution.
```
