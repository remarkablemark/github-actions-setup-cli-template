# github-actions-setup-cli-template

[![build](https://github.com/remarkablemark/github-actions-setup-cli-template/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/github-actions-setup-cli-template/actions/workflows/build.yml)

GitHub Actions setup CLI template. Inspired by [github-developer/example-setup-gh](https://github.com/github-developer/example-setup-gh). Template from [remarkablemark/github-actions-typescript-template](https://github.com/remarkablemark/github-actions-typescript-template).

## Usage

See [action.yml](action.yml)

**Basic:**

```yaml
steps:
  - uses: remarkablemark/github-actions-setup-cli-template@v1
```

## Inputs

### `cli-version`

**Optional**: The CLI [version](https://github.com/cli/cli/releases). Defaults to [`2.27.0`](https://github.com/cli/cli/releases/tag/v2.27.0):

```yaml
- uses: remarkablemark/github-actions-setup-cli-template@v1
  with:
    cli-version: 2.27.0
```

## Contributions

Contributions are welcome!

## License

[MIT](LICENSE)
