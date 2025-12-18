const baseUrl = import.meta.env.VITE_API_URL;

const responseHandler = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }
  return response.json();
};

export const get = async <T>(endpoint: string): Promise<T> => {
  return fetch(`${baseUrl}/${endpoint}`).then(responseHandler);
};
export const post = async <T extends Object, R extends Object>(
  endpoint: string,
  body: T,
): Promise<R> => {
  return fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(responseHandler);
};
export const put = async <T extends Object>(endpoint: string, body: T) => {
  return fetch(`${baseUrl}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(responseHandler);
};
