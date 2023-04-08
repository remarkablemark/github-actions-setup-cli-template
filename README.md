# github-actions-typescript-template

[![build](https://github.com/remarkablemark/github-actions-typescript-template/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/github-actions-typescript-template/actions/workflows/build.yml)

GitHub Actions TypeScript template. Inspired by [actions/typescript-action](https://github.com/actions/typescript-action).

## Usage

See [action.yml](action.yml)

**Basic:**

```yaml
steps:
  - uses: remarkablemark/github-actions-typescript-template@v1
```

## Inputs

### `version`

**Optional**: The version. Defaults to `1.2.3`. Example:

```yaml
- uses: remarkablemark/github-actions-typescript-template@v1
  with:
    version: 1.2.3
```

## Contributions

Contributions are welcome!

## License

[MIT](LICENSE)
