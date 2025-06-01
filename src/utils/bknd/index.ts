import { type AstroBkndConfig, getApp as getBkndApp } from "bknd/adapter/astro";

export const config = {
  connection: {
    url: "file:data.db",
  },
} as const satisfies AstroBkndConfig;

export async function getApp() {
  return await getBkndApp(config);
}

export async function getApi(headers: Headers, opts: { verify: boolean } ) {
  const app = await getApp();
  
  if (opts?.verify) {
    const api = app.getApi({ headers });
    await api.verifyAuth();
    return api;
  }

  return app.getApi();
}
