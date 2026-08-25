export function generateRequestId(apiId: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${apiId}-${Date.now()}-${random}`;
}
