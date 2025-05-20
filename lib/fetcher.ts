/**
 * Fetches data from the specified URL and returns the parsed JSON response.
 * @param url - The URL to fetch data from.
 * @returns A Promise that resolves to the parsed JSON response.
 */
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
