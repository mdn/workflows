# auto-merge

The `auto-merge` reusable action is located at [`.github/actions/auto-merge.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/auto-merge.yml).

This workflow auto merges pull requests.
To use it you will need a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the following scopes:

- `repo` for private repositories
- `public_repo` for public repositories

> NOTE: This action will auto merge only those pull requests that were opened by [Dependabot](https://github.com/dependabot).

In the repository that will call this action, you need to [define a secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) named `GH_TOKEN` with the value of your Personal Access Token.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [dependabot-auto-merge](https://github.com/marketplace/actions/dependabot-auto-merge)

## Inputs

### Required inputs

#### target-repo

Specify the target repository this action should run on. This is used to prevent actions from running on repositories other than the target repository. For example, specifying a `target-repo` of `mdn/workflows` will prevent the workflow from running on forks of `mdn/workflows`.

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

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/auto-merge.yml` file with the following content:

### With defaults

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

### Overriding some defaults

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
