import {
  init,
  captureRouterTransitionStart,
  replayIntegration,
} from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

init({
  dsn: isProd ? "https://yourdsn" : undefined,
  integrations: isProd ? [replayIntegration()] : [],
  tracesSampleRate: isProd ? 1.0 : 0.0,
  replaysSessionSampleRate: isProd ? 0.1 : 0.0,
  replaysOnErrorSampleRate: isProd ? 1.0 : 0.0,
  debug: !isProd,
});

export { captureRouterTransitionStart as onRouterTransitionStart };
