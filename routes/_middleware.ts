import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  // TODO: this is horrible! :(
  if (req.url.includes("?offset")) {
    const [_url, offset] = req.url.split("?")[1];
    ctx.state.data = offset;
  }
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
