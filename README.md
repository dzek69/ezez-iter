# @ezez/iter

Generates a list of urls from a given pattern.
Useful for security testing, scraping, or any other task that requires a list of urls.

- [0-12] will be replaced with numbers from 0 to 12.
- [001-999] will be replaced with numbers from 001 to 999 (padded).
- {one|two} will be replaced with "one" and "two".

## Example

```typescript
const urls = iter("https://example.com/[1-2]/page[01-11]?q={one|two}");
// result:
[
    "https://example.com/1/page01?q=one",
    "https://example.com/1/page01?q=two",
    "https://example.com/1/page02?q=one",
    "https://example.com/1/page02?q=two",
    // ...
    "https://example.com/2/page01?q=one",
    // ...and so on
]
```

## Docs

Documentation can be found here: [@ezez/iter documentation](https://ezez.dev/docs/iter/latest).

## License

MIT
