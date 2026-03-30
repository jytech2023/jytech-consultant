// Calendly OAuth & API utilities

const CALENDLY_AUTH_BASE = "https://auth.calendly.com";
const CALENDLY_API_BASE = "https://api.calendly.com";

export const CALENDLY_CLIENT_ID = process.env.CALENDLY_CLIENT_ID!;
export const CALENDLY_CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET!;
export const CALENDLY_REDIRECT_URI = process.env.CALENDLY_REDIRECT_URI!;

export function getAuthorizationUrl(state: string) {
  const params = new URLSearchParams({
    client_id: CALENDLY_CLIENT_ID,
    redirect_uri: CALENDLY_REDIRECT_URI,
    response_type: "code",
    state,
  });
  return `${CALENDLY_AUTH_BASE}/oauth/authorize?${params}`;
}

export async function exchangeCodeForTokens(code: string) {
  const res = await fetch(`${CALENDLY_AUTH_BASE}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: CALENDLY_CLIENT_ID,
      client_secret: CALENDLY_CLIENT_SECRET,
      redirect_uri: CALENDLY_REDIRECT_URI,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Calendly token exchange failed: ${err}`);
  }
  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }>;
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${CALENDLY_AUTH_BASE}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CALENDLY_CLIENT_ID,
      client_secret: CALENDLY_CLIENT_SECRET,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Calendly token refresh failed: ${err}`);
  }
  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>;
}

// Generic Calendly API call with auto-refresh
export async function calendlyFetch(
  path: string,
  accessToken: string,
  options?: RequestInit
) {
  const res = await fetch(`${CALENDLY_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  return res;
}

export async function getCurrentUser(accessToken: string) {
  const res = await calendlyFetch("/users/me", accessToken);
  if (!res.ok) throw new Error("Failed to get Calendly user");
  const data = await res.json();
  return data.resource as {
    uri: string;
    email: string;
    name: string;
    scheduling_url: string;
  };
}

export async function getEventTypes(accessToken: string, userUri: string) {
  const params = new URLSearchParams({ user: userUri, active: "true" });
  const res = await calendlyFetch(`/event_types?${params}`, accessToken);
  if (!res.ok) throw new Error("Failed to get event types");
  const data = await res.json();
  return data.collection as Array<{
    uri: string;
    name: string;
    slug: string;
    duration: number;
    scheduling_url: string;
    description_plain: string | null;
    color: string;
    active: boolean;
  }>;
}

export async function getAvailableTimes(
  accessToken: string,
  eventTypeUri: string,
  startTime: string,
  endTime: string
) {
  const params = new URLSearchParams({
    event_type: eventTypeUri,
    start_time: startTime,
    end_time: endTime,
  });
  const res = await calendlyFetch(
    `/event_type_available_times?${params}`,
    accessToken
  );
  if (!res.ok) throw new Error("Failed to get available times");
  const data = await res.json();
  return data.collection as Array<{
    status: string;
    invitees_remaining: number;
    start_time: string;
  }>;
}
