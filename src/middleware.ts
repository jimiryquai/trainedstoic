import type { MiddlewareNext } from "astro";
import type { APIContext } from "astro";
import { createRuntimeApp } from "bknd/adapter";
import { config } from "./bknd";

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  const request = context.request;
  const url = new URL(request.url);

  const app = await createRuntimeApp(
    {
      ...config,
      onBuilt: async (app) => {
        app.registerAdminController({
          assetsPath: "/bknd/",
          adminBasepath: "/admin"
        });
      }
    },
    context
  );

  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) {
    try {
      const response = await app.fetch(request);
      return response;
    } catch (error: any) {
      console.error(error);
      context.cookies.set(
        "__bknd_flash",
        error?.message ||
          (import.meta.env.DEV
            ? "An unknown error occurred. Check the console for more details."
            : "An unknown error occurred.")
      );
      return context.redirect("/");
    }
  }

  return next();
}
