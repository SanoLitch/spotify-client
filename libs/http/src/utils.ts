export function getHttpClientToken(name: string): string | undefined {
  if (!name) {
    return;
  }
  return `HTTP_CLIENT_${ name }`;
}
