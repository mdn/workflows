# workflows

Reusable GitHub Actions workflows

## auto-merge

The `auto-merge` reusable action is located in `.github/workflows/auto-merge.yml`. To use it you will need a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the following scopes:

- `repo` for private repositories
- `public_repo` for public repositories

In the repository that will call this action, you need to [define a secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) named `GH_TOKEN` with the value of your Personal Access Token.

This reusable action depends on the following actions:

- [checkout](https://github.com/marketplace/actions/checkout)
- [dependabot-auto-merge](https://github.com/marketplace/actions/dependabot-auto-merge)

### Usage

In the repository that will call this action, you will need to add a `.github/workflows/auto-merge.yml` file with the following content:

```yml
name: "auto-merge"
on: [pull_request_target]

jobs:
  auto-merge:
    uses:  mdn/workflows/.github/workflows/auto-merge.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```
