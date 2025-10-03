import { createRequestHandler } from '@shopify/hydrogen/oxygen';
import { createHydrogenContext } from '@shopify/hydrogen';

export const handler = async (event, context) => {
  try {
    // Dynamically import the server build
    const serverBuild = await import("../../dist/server/index.js");

    // Create a Web Request from the Netlify event
    const url = new URL(event.rawUrl || `https://${event.headers.host}${event.path}`);

    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: new Headers(event.headers),
      body: event.body
        ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body)
        : undefined,
    });

    // Create mock env object for Hydrogen
    const env = {
      PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || 'quickstart-12345678.myshopify.com',
      PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || 'dummy-token',
      PUBLIC_STOREFRONT_API_VERSION: process.env.PUBLIC_STOREFRONT_API_VERSION || '2024-10',
      SESSION_SECRET: process.env.SESSION_SECRET || 'dummy-secret-for-netlify-build',
    };

    // Create mock cache
    const mockCache = {
      match: async () => undefined,
      put: async () => {},
      delete: async () => false,
    };

    // Create mock session
    const mockSession = {
      get: () => undefined,
      set: () => {},
      unset: () => {},
      commit: async () => '',
      isPending: false,
      data: {},
    };

    // Create mock waitUntil
    const waitUntil = (promise) => {
      promise.catch((error) => console.error('waitUntil error:', error));
    };

    // Create Hydrogen context
    const hydrogenContext = createHydrogenContext({
      env,
      request,
      cache: mockCache,
      waitUntil,
      session: mockSession,
      i18n: { language: 'EN', country: 'US' },
      cart: {
        queryFragment: '',
      },
    });

    // Create Hydrogen request handler
    const handleRequest = createRequestHandler({
      build: serverBuild,
      mode: process.env.NODE_ENV || 'production',
      getLoadContext: () => hydrogenContext,
    });

    // Call the handler
    const response = await handleRequest(request);

    // Convert Response to Netlify format
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const body = await response.text();

    return {
      statusCode: response.status,
      headers,
      body,
      isBase64Encoded: false,
    };
  } catch (error) {
    console.error('Error handling request:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
        stack: error.stack
      }),
    };
  }
};

