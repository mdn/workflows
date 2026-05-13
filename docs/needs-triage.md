# needs-triage

The `needs-triage` reusable action is located at [`.github/workflows/needs-triage.yml`](https://github.com/mdn/workflows/tree/main/.github/workflows/needs-triage.yml).

It adds a label (default: `needs triage`) to an issue when it is opened, reopened, or transferred.

## Inputs

### Optional inputs

#### label

The label to add to the issue.

- This `input` is optional with a default of `needs triage`.

## Usage

In the repository that will call this action, add a `.github/workflows/needs-triage.yml` file with the following content:

### With defaults

```yml
name: needs-triage

on:
  issues:
    types:
      - opened
      - reopened
      - transferred

jobs:
  needs-triage:
    uses: mdn/workflows/.github/workflows/needs-triage.yml@main
```

To prevent execution on forks, add an `if` condition to the job:

```yml
jobs:
  needs-triage:
    if: github.repository_owner == 'mdn'
    uses: mdn/workflows/.github/workflows/needs-triage.yml@main
```

### Overriding the label

```yml
name: needs-triage

on:
  issues:
    types:
      - opened
      - reopened
      - transferred

jobs:
  needs-triage:
    uses: mdn/workflows/.github/workflows/needs-triage.yml@main
    with:
      label: "triage"
```
