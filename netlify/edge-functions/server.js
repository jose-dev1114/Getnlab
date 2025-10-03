import * as build from "../../build/server/index.js";

export default async (request, context) => {
  const url = new URL(request.url);

  // Let static assets pass through to be served from build/client
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/svg/') ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
  ) {
    return context.next();
  }

  try {
    // The build exports a handler function
    const handler = build.default || build.handler || build;

    console.log("Build exports:", Object.keys(build));
    console.log("Handler type:", typeof handler);

    // If handler is a function, call it directly
    if (typeof handler === 'function') {
      const response = await handler(request, {
        PUBLIC_STORE_DOMAIN: Netlify.env.get("PUBLIC_STORE_DOMAIN") || "quickstart-12345678.myshopify.com",
        PUBLIC_STOREFRONT_API_TOKEN: Netlify.env.get("PUBLIC_STOREFRONT_API_TOKEN") || "dummy-token",
        PUBLIC_STOREFRONT_API_VERSION: Netlify.env.get("PUBLIC_STOREFRONT_API_VERSION") || "2024-10",
        SESSION_SECRET: Netlify.env.get("SESSION_SECRET") || "dummy-secret",
      }, {
        waitUntil: (promise) => context.waitUntil(promise),
        passThroughOnException: () => {},
      });
      return response;
    }

    // If handler has a fetch method, call it
    if (handler && typeof handler.fetch === 'function') {
      const response = await handler.fetch(request, {
        PUBLIC_STORE_DOMAIN: Netlify.env.get("PUBLIC_STORE_DOMAIN") || "quickstart-12345678.myshopify.com",
        PUBLIC_STOREFRONT_API_TOKEN: Netlify.env.get("PUBLIC_STOREFRONT_API_TOKEN") || "dummy-token",
        PUBLIC_STOREFRONT_API_VERSION: Netlify.env.get("PUBLIC_STOREFRONT_API_VERSION") || "2024-10",
        SESSION_SECRET: Netlify.env.get("SESSION_SECRET") || "dummy-secret",
      }, {
        waitUntil: (promise) => context.waitUntil(promise),
        passThroughOnException: () => {},
      });
      return response;
    }

    throw new Error("No valid handler found in build");

  } catch (error) {
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/*" };

