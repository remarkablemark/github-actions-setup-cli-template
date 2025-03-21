# github-actions-setup-cli-template

[![version](https://badgen.net/github/release/remarkablemark/github-actions-setup-cli-template)](https://github.com/remarkablemark/github-actions-setup-cli-template/releases)
[![build](https://github.com/remarkablemark/github-actions-setup-cli-template/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/github-actions-setup-cli-template/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/github-actions-setup-cli-template/graph/badge.svg?token=PGPJ2Q8HUO)](https://codecov.io/gh/remarkablemark/github-actions-setup-cli-template)

⚙️ GitHub Actions setup CLI template. Inspired by [github-developer/example-setup-gh](https://github.com/github-developer/example-setup-gh). Template from [remarkablemark/github-actions-typescript-template](https://github.com/remarkablemark/github-actions-typescript-template).

## Quick Start

```yaml
name: github-actions-setup-cli-template
on: push
jobs:
  github-actions-setup-cli-template:
    runs-on: ubuntu-latest
    steps:
      - name: Setup github-actions-setup-cli-template
        uses: remarkablemark/github-actions-setup-cli-template@v1
```

## Usage

**Basic:**

```yaml
- uses: remarkablemark/github-actions-setup-cli-template@v1
```

See [action.yml](action.yml)

## Inputs

### `cli-version`

**Optional**: The CLI [version](https://github.com/cli/cli/releases). Defaults to [`2.49.0`](https://github.com/cli/cli/releases/tag/v2.49.0):

```yaml
- uses: remarkablemark/github-actions-setup-cli-template@v1
  with:
    cli-version: 2.49.0
```

### `cli-name`

**Optional**: The CLI name. Defaults to `gh`:

```yaml
- uses: remarkablemark/github-actions-setup-cli-template@v1
  with:
    cli-name: gh
```

## License

[MIT](LICENSE)
