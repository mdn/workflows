# approve-fork-runs

The `approve-fork-runs` reusable action is located at [`.github/workflows/approve-fork-runs.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/approve-fork-runs.yml).

Workflow runs triggered by `pull_request` events from forks can require a maintainer to click "Approve workflows to run" before they start.
This workflow approves those runs automatically when the pull request only changes allowlisted files, and leaves all other pull requests for manual approval.

It works as follows:

1. It only runs for pull requests from forks.
2. It lists the files changed by the pull request. If any path (including the previous path of a renamed file) does not match `allowed-paths`, it exits successfully without approving anything.
3. It waits for the workflow runs of the pull request's head commit that await approval.
4. It re-reads the pull request, and stops without approving if the head commit changed since the workflow was triggered, or if the list of changed files is incomplete.
5. It approves the runs.

This reusable action only uses the GitHub API, and depends on the following actions:

- [github-script](https://github.com/marketplace/actions/github-script)

## Security

- The caller **must** trigger this workflow with `pull_request_target`. Workflows triggered by `pull_request_target` run from the base branch, so a fork cannot modify the workflow or its `allowed-paths`. The workflow does nothing for other events.
- The workflow never checks out, builds, or executes code from the pull request.
- Keep the repository's [approval policy for fork pull request workflows](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#controlling-changes-from-forks-to-workflows-in-public-repositories) at "Require approval for first-time contributors" or stricter. This workflow only replaces the manual click for allowlisted changes, it is not a substitute for the policy.
- Only allowlist paths that cannot influence what the approved workflows execute. Do not allowlist workflows, scripts, build configuration, or dependency manifests.
- Anchor the expression with `^` and `$`. An unanchored expression matches anywhere in the path, so `\.json$` also allows `.github/workflows/evil.json`, and `^api/` alone also allows `api/build.js`.

## Permissions

The workflow uses the `GITHUB_TOKEN` and needs the following permissions, which the caller must grant:

- `actions: write` to approve workflow runs.
- `pull-requests: read` to read the pull request and its changed files.

## Inputs

### Required inputs

#### allowed-paths

[JavaScript regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) that every changed file path must match for the workflow runs to be approved. For renamed files, both the new and the previous path must match.

- This `input` is required.

### Optional inputs

#### max-wait-seconds

The maximum number of seconds to wait for workflow runs awaiting approval to appear. The workflow stops waiting as soon as the head commit has runs and none of them await approval.

- This `input` is optional with a default of `60`.

## Usage

In the repository that will call this action, you will need to add a `.github/workflows/approve-fork-runs.yml` file with the following content:

### With defaults

This example for [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) approves runs for pull requests that only change compatibility data:

```yml
name: approve-fork-runs

on:
  pull_request_target:
    types: [opened, synchronize, reopened]

permissions: {}

jobs:
  approve:
    if: github.repository_owner == 'mdn'
    uses: mdn/workflows/.github/workflows/approve-fork-runs.yml@main
    permissions:
      actions: write
      pull-requests: read
    with:
      allowed-paths: '^(api|css|html|http|javascript|mathml|svg|webassembly|webdriver|webextensions)/.*\.json$'
```

### Overriding the wait time

```yml
name: approve-fork-runs

on:
  pull_request_target:
    types: [opened, synchronize, reopened]

permissions: {}

jobs:
  approve:
    if: github.repository_owner == 'mdn'
    uses: mdn/workflows/.github/workflows/approve-fork-runs.yml@main
    permissions:
      actions: write
      pull-requests: read
    with:
      allowed-paths: '^docs/.*\.md$'
      max-wait-seconds: 120
```
