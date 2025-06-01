import type { APIContext } from "astro";
import { serve } from "bknd/adapter/astro";
import config from "../../../bknd.config";

export const ALL = serve<APIContext>(config);
