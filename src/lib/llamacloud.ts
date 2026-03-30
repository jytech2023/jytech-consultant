const BASE_URL = "https://api.cloud.llamaindex.ai/api/v1";

// Get the effective LlamaIndex API key — user's BYOK key or system default
export function getLlamaKey(userKey?: string | null): string {
  return userKey || process.env.LLAMAINDEX_API_KEY!;
}

// Upload & parse a document via LlamaParse
export async function parseDocument(
  file: File | Blob,
  fileName: string,
  apiKey: string
): Promise<{ jobId: string }> {
  const formData = new FormData();
  formData.append("file", file, fileName);

  const res = await fetch(`${BASE_URL}/parsing/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LlamaParse upload failed: ${err}`);
  }

  const data = await res.json();
  return { jobId: data.id };
}

// Check parsing job status
export async function getParseStatus(
  jobId: string,
  apiKey: string
): Promise<{ status: string; errorMessage?: string }> {
  const res = await fetch(`${BASE_URL}/parsing/job/${jobId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) throw new Error("Failed to check parse status");

  const data = await res.json();
  return { status: data.status, errorMessage: data.error_message };
}

// Get parsed markdown result
export async function getParseResult(
  jobId: string,
  apiKey: string
): Promise<string> {
  const res = await fetch(`${BASE_URL}/parsing/job/${jobId}/result/markdown`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) throw new Error("Failed to get parse result");

  const data = await res.json();
  return data.markdown;
}

// Upload a file to LlamaCloud storage
export async function uploadFile(
  file: File | Blob,
  fileName: string,
  projectId: string,
  apiKey: string
): Promise<{ fileId: string }> {
  const formData = new FormData();
  formData.append("upload_file", file, fileName);
  formData.append("project_id", projectId);

  const res = await fetch(`${BASE_URL}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`File upload failed: ${err}`);
  }

  const data = await res.json();
  return { fileId: data.id };
}

// List files in a project
export async function listFiles(
  projectId: string,
  apiKey: string
): Promise<{ id: string; name: string; file_size: number; created_at: string }[]> {
  const res = await fetch(`${BASE_URL}/files?project_id=${projectId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) throw new Error("Failed to list files");
  return res.json();
}

// List projects
export async function listProjects(
  apiKey: string
): Promise<{ id: string; name: string }[]> {
  const res = await fetch(`${BASE_URL}/projects`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) throw new Error("Failed to list projects");
  return res.json();
}
