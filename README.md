# github-actions-setup-cli-template

[![build](https://github.com/remarkablemark/github-actions-setup-cli-template/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/github-actions-setup-cli-template/actions/workflows/build.yml)

GitHub Actions setup CLI template. Inspired by [github-developer/example-setup-gh](https://github.com/github-developer/example-setup-gh).

## Usage

See [action.yml](action.yml)

**Basic:**

```yaml
steps:
  - uses: remarkablemark/github-actions-setup-cli-template@v1
```

## Inputs

### `version`

**Optional**: The version. Defaults to `1.2.3`. Example:

```yaml
- uses: remarkablemark/github-actions-setup-cli-template@v1
  with:
    version: 1.2.3
```

## Contributions

Contributions are welcome!

## License

[MIT](LICENSE)
