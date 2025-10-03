import build from "../../build/server/index.js";

export default async (request, context) => {
  try {
    const response = await build.default.fetch(request, {
      PUBLIC_STORE_DOMAIN: Netlify.env.get("PUBLIC_STORE_DOMAIN") || "quickstart-12345678.myshopify.com",
      PUBLIC_STOREFRONT_API_TOKEN: Netlify.env.get("PUBLIC_STOREFRONT_API_TOKEN") || "dummy-token",
      PUBLIC_STOREFRONT_API_VERSION: Netlify.env.get("PUBLIC_STOREFRONT_API_VERSION") || "2024-10",
      SESSION_SECRET: Netlify.env.get("SESSION_SECRET") || "dummy-secret",
    }, {
      waitUntil: (promise) => context.waitUntil(promise),
      passThroughOnException: () => {},
    });
    
    return response;
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/*" };

