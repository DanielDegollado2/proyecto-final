const BASE_URL = "https://d3ujwk09smrk9z.cloudfront.net/info";

export async function obtenerInfo() {
  const response = await fetch(`${BASE_URL}/films`);
  if (!response.ok) {
    throw new Error("Error al obtener la info");
  }
  return response.json();
}