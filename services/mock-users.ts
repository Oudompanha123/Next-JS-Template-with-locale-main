// These are placeholder credentials for local development only (see MOCK_AUTH
// in auth.service.ts, which is hard-disabled outside development). They are
// not secrets: they grant no access to any real system, and are intentionally
// published in this template so contributors know how to sign in locally.
export type MockUser = {
  userId: string;
  password: string;
  scope: string;
};

export const mockUsers: MockUser[] = [
  { userId: "admin", password: "admin123", scope: "SYS_ADMIN" }, // NOSONAR typescript:S2068 - dev-only placeholder, see file header
  { userId: "manager", password: "manager123", scope: "MANAGER" }, // NOSONAR typescript:S2068 - dev-only placeholder, see file header
  { userId: "user", password: "user123", scope: "USER" }, // NOSONAR typescript:S2068 - dev-only placeholder, see file header
];

export const findMockUser = (userId: string, password: string) =>
  mockUsers.find((candidate) => candidate.userId === userId && candidate.password === password);

const toBase64 = (payload: Record<string, unknown>) =>
  Buffer.from(JSON.stringify(payload)).toString("base64");

// auth.ts's session() callback decodes token.token as a JWT payload
// (`atob` on the middle segment), so the mock access token needs to look
// like one: header.payload.signature, base64-encoded (not base64url).
export function createMockLoginResponse(user: MockUser) {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64({ alg: "none", typ: "JWT" });
  const payload = toBase64({
    sub: user.userId,
    scope: user.scope,
    iat: now,
    exp: now + 60 * 60,
  });
  const accessToken = `${header}.${payload}.mock-signature`;

  return {
    status: 200,
    data: {
      status: { code: 200, message: "OK (mock)" },
      data: {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: 3600,
      },
      sub: user.userId,
      scope: user.scope,
    },
  };
}
