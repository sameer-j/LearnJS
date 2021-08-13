'use strict';

async function fetchStatusCodes(urls) {
  // const httpResponses = urls.map((url) => await fetch(url));
  const httpResponses = await Promise.all(urls.map(async (url) => fetch(url)));
  return httpResponses.map((response) => response.status);
}

(async () => {
  const statusCodes = await fetchStatusCodes([
    "https://example.com",
    "https://example.com/bar",
    "https://example.com/baz"
  ]);
  console.log(statusCodes);
})();