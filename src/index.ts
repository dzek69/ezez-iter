const generateOptions = (raw: string, from: string | undefined, to: string | undefined) => {
    if (from === undefined || to === undefined) {
        return raw.slice(1, -1).split("|");
    }
    const fromNumber = parseInt(from, 10);
    const toNumber = parseInt(to, 10);
    const shouldPad = from !== "0" && from.startsWith("0");

    const results: string[] = [];
    for (let i = fromNumber; i <= toNumber; i++) {
        results.push(shouldPad ? i.toString().padStart(from.length, "0") : i.toString());
    }
    return results;
};

/**
 * Generates a list of urls from a given pattern.
 * [0-12] will be replaced with numbers from 0 to 12.
 * [001-999] will be replaced with numbers from 001 to 999 (padded).
 * {one|two} will be replaced with "one" and "two".
 *
 * You can mix these patterns.
 *
 * Order is undefined and may change in the future.
 *
 * @example
 * ```typescript
 * const urls = iter("https://example.com/[1-2]/page[01-11]?q={one|two}");
 * // result:
 * [
 *  "https://example.com/1/page01?q=one",
 *  "https://example.com/1/page01?q=two",
 *  "https://example.com/1/page02?q=one",
 *  "https://example.com/1/page02?q=two",
 *  // and so on
 * ]
 * ```
 * @param url - url pattern
 * @returns the list of urls
 */
const iter = (url: string) => {
    const regexp = /(\[(\d+)-(\d+)\]|\{[^}]+})/g;
    const matches = [...url.matchAll(regexp)];

    if (!matches.length) {
        return [];
    }

    const reversed = matches.reverse();
    let tmpResults: string[] = [];
    reversed.forEach((match) => {
        const [,raw, from, to] = match;
        if (raw === undefined) {
            throw new Error("Impossible error? raw is undefined");
        }
        const options = generateOptions(raw, from, to);
        if (!tmpResults.length) {
            options.forEach((option) => {
                tmpResults.push(
                    url.slice(0, match.index) + option + url.slice(match.index + match[0].length),
                );
            });
            return;
        }
        const length = tmpResults.length;
        tmpResults.forEach((urlBase) => {
            options.forEach((option) => {
                tmpResults.push(
                    urlBase.slice(0, match.index) + option + urlBase.slice(match.index + match[0].length),
                );
            });
        });
        tmpResults = tmpResults.slice(length);
    });
    return tmpResults;
};

export {
    iter,
};
