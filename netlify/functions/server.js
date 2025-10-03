import { createRequestHandler } from "@react-router/node";
import * as build from "../../dist/server/index.js";

export const handler = async (event, context) => {
  const requestHandler = createRequestHandler(build, process.env.NODE_ENV);

  const request = new Request(event.rawUrl, {
    method: event.httpMethod,
    headers: new Headers(event.headers),
    body: event.body ? (event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body) : undefined,
  });

  try {
    const response = await requestHandler(request);

    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      statusCode: response.status,
      headers,
      body: await response.text(),
    };
  } catch (error) {
    console.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

