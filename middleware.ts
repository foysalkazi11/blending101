import { withSSRContext } from "aws-amplify";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeProtectedHeader, importJWK, jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const response = NextResponse.next();
  // Authenticate users for protected resources
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

  try {
    // Define paths that don't require authentication
    const unauthenticatedPaths = [
      "/login",
      "/verify_email",
      "/signup",
      "/reset_password",
      "/forget_password",
      "/extension",
      "/404",
    ];

    // Allow users to continue for pages that don't require authentication
    if (unauthenticatedPaths.includes(url.pathname)) {
      return response;
    } else {
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
            .then((res) => res.payload.email_verified)
            .catch(() => {});
          // Allow verified users to continue
          if (jwtVerified) {
            response.cookies.set("bearer_token", token);
            return response;
          }
        }
      } else {
        return NextResponse.redirect(`${url.origin}/login`);
      }
    }
  } catch (err) {
    console.log("err", err);
  }
  // console.log("**********************************");
  // console.log(url);
  // console.log("**********************************");

  // const pattern = /\?code=[a-zA-Z0-9-]+&state=[a-zA-Z0-9]+/;
  // if (url.pathname === "/" && pattern.test(url.search) && token) {
  //   return response;
  // }
  // return NextResponse.redirect(`${url.origin}/loginss`);

  // Redirect unauthenticated users to the login page when they attempt to access protected pages
  // return NextResponse.redirect(`${url.origin}/login`);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/challenge",
    "/challenge/invited",
    "/challenge/shared",
    "/planner",
    "/planner/:path",
    "/planner/plan/:path* ",
  ],
};
