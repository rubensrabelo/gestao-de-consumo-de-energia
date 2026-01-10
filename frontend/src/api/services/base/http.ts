import ENV from "../../../config/envConfig";

export async function http<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${ENV.API_BASE_URL}/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  return response.json();
}
