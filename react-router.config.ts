import type { Config } from "@react-router/dev/config";

export default {
  // This portfolio has no runtime loaders or actions, so static output is
  // sufficient and avoids requiring a Vercel server adapter.
  ssr: false,
  prerender: true,
} satisfies Config;
