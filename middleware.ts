import { withSSRContext } from "aws-amplify";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeProtectedHeader, importJWK, jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const response = NextResponse.next();
  console.log("****invoked");
  try {
    // Define paths that don't require authentication
    const unauthenticatedPaths = [
      "/login",
      "/password-reset",
      "/pricing",
      "/signup",
      "/support",
    ];

    // Allow users to continue for pages that don't require authentication
    if (unauthenticatedPaths.includes(url.pathname)) {
      return response;
    } else {
      // Authenticate users for protected resources
      // Cognito data
      const region = process.env.NEXT_PUBLIC_AWS_REGION;
      const poolId = process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID;
      const clientId = process.env.NEXT_PUBLIC_AWS_APP_CLIENT_ID;

      // Get the user's token
      const token = req.cookies
        .getAll()
        .find((cookie) =>
          new RegExp(
            `CognitoIdentityServiceProvider\\.${clientId}\\..+\\.idToken`,
          ).test(cookie.name),
        )?.value;

      if (token) {
        // Get keys from AWS
        const { keys } = await fetch(
          `https://cognito-idp.${region}.amazonaws.com/${poolId}/.well-known/jwks.json`,
        ).then((res) => res.json());

        // Decode the user's token
        const { kid } = decodeProtectedHeader(token);

        // Find the user's decoded token in the Cognito keys
        const jwk = keys.find((key) => key.kid === kid);

        if (jwk) {
          // Import JWT using the JWK
          const jwtImport = await importJWK(jwk);

          // Verify the users JWT
          const jwtVerified = await jwtVerify(token, jwtImport)
            .then((res) => {
              console.log(res);
              return res.payload.email_verified;
            })
            .catch(() => {});
          // Allow verified users to continue
          if (jwtVerified) {
            response.cookies.set("bearer_token", token);
            return response;
          }
        }
      }
    }
  } catch (err) {
    console.log("err", err);
  }
  // Send 401 when an unauthenticated user trys to access API endpoints
  if (url.pathname.includes("api")) {
    return new Response("Auth required", { status: 401 });
  } else {
    // Redirect unauthenticated users to the login page when they attempt to access protected pages
    return NextResponse.redirect(`${url.origin}/login`);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
