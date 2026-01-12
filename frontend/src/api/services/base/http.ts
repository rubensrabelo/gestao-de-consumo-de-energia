import ENV from "../../../config/envConfig";

interface HttpErrorResponse {
  message?: string;
}

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
    let errorMessage = "Erro na requisição";

    try {
      const errorBody: HttpErrorResponse = await response.json();
      if (errorBody.message) {
        errorMessage = errorBody.message;
      }
    } catch {
      // ignora erro de parse
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
