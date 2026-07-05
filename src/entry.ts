export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url)
    const response = await env.ASSETS.fetch(request)

    if (response.status === 404 && !url.pathname.startsWith('/assets/')) {
      return await env.ASSETS.fetch(
        new Request(`${url.origin}/index.html`, request)
      )
    }

    return response
  },
}