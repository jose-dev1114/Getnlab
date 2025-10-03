export const handler = async (event, context) => {
  try {
    // Dynamically import the server build
    const { default: handler } = await import("../../dist/server/index.js");

    // Create a Web Request from the Netlify event
    const url = new URL(event.rawUrl || `https://${event.headers.host}${event.path}`);

    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: new Headers(event.headers),
      body: event.body
        ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body)
        : undefined,
    });

    // Call the React Router handler
    const response = await handler(request, {
      context: {
        netlify: { event, context }
      }
    });

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
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
};

