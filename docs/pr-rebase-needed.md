# pr-rebase-needed

The `pr-rebase-needed` reusable action is located at [`.github/workflows/pr-rebase-needed.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/pr-rebase-needed.yml).

This reusable action depends on the following actions:

- [actions-label-merge-conflict](https://github.com/marketplace/actions/label-conflicting-pull-requests)

## Inputs

The action has the following inputs:

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the action from running on forks of `mdn/workflows`.

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

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/pr-rebase-needed.yml` file with the following content:

### With defaults

```yml
name: pr-rebase-needed

on:
  push:
  pull_request_target:
    types: [synchronize]

jobs:
  pr-rebase-needed:
    uses: mdn/workflows/.github/workflows/pr-rebase-needed.yml@main
    with:
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

### Overriding some defaults

```yml
name: pr-rebase-needed

on:
  push:
  pull_request_target:
    types: [synchronize]

jobs:
  pr-rebase-needed:
    uses: mdn/workflows/.github/workflows/pr-rebase-needed.yml@main
    with:
      comment: "This pull requests has merge conflicts that needs to be resolved before being merged. Thank you."
      target-repo: "mdn/workflows"
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```
