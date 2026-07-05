export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Esto obliga al Worker a buscar y servir los archivos de la carpeta dist automáticamente
    return await env.ASSETS.fetch(request);
  },
};