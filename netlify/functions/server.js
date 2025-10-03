import serverBuild from "../../build/server/index.js";

export const handler = async (event, context) => {
  try {
    // Create a Request from the Netlify event
    const url = new URL(event.rawUrl || `https://${event.headers.host}${event.path}`);

    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: new Headers(event.headers),
      body: event.body
        ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body)
        : undefined,
    });

    // Call the server build's default export (the fetch handler)
    const response = await serverBuild.default.fetch(
      request,
      {
        PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || 'quickstart-12345678.myshopify.com',
        PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || 'dummy-token',
        PUBLIC_STOREFRONT_API_VERSION: process.env.PUBLIC_STOREFRONT_API_VERSION || '2024-10',
        SESSION_SECRET: process.env.SESSION_SECRET || 'dummy-secret',
      },
      {
        waitUntil: (promise) => {
          promise.catch((error) => console.error('waitUntil error:', error));
        },
        passThroughOnException: () => {},
      }
    );

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

