const BASE_URL = 'http://localhost:3000/'

export async function httpRequest(url, options = {}) {
  try {
    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.error || "Une erreur est survenue.");
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export function getJson(url, headers = {}) {
  return httpRequest(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export function postJson(url, body, headers = {}) {
  return httpRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

export function putJson(url, body, headers = {}) {
  return httpRequest(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

export function deleteJson(url, headers = {}) {
  return httpRequest(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
