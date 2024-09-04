import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { clientIsLoggedIn, logInClient } from "./APIRoutes";
import { NextRequest, NextResponse } from "next/server";
import { isLuminosityAboveThreshold } from "./functions";

// session secret
const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);
const sessionTimeInSeconds = 3600 // 3600 seconds

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${sessionTimeInSeconds} sec from now`)
      .sign(key);
  }

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }

export async function login(formData: FormData) {
    // // Verify credentials && get the users
    const attemptLogin = await logInClient({
        email: formData.get('email'),
        password: formData.get('password')
    })
    if (attemptLogin.err) return {err: attemptLogin.err}
    
    const checkLogin = await clientIsLoggedIn({userId: attemptLogin?.user?._id})
        
    const luminosityThreshold = 0.5;
    // Create the session
    const expires = new Date(Date.now() + sessionTimeInSeconds * 1000); 
    const session = await encrypt({ 
      id: attemptLogin?.user?._id, 
      username: attemptLogin?.user?.email, 
      email: attemptLogin?.user?.email, 
      expires,
      whiteLabel: {
        ...checkLogin?.whiteLabel,
        primaryLuminosity: checkLogin?.whiteLabel?.primaryColor ? isLuminosityAboveThreshold({hexColor: checkLogin?.whiteLabel?.primaryColor, threshold: luminosityThreshold}) : false,
        secondaryLuminosity: checkLogin?.whiteLabel?.secondaryColor ? isLuminosityAboveThreshold({hexColor: checkLogin?.whiteLabel?.secondaryColor, threshold: luminosityThreshold}) : false,
      },
    });
  
    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  const checkLogin = await clientIsLoggedIn({userId: parsed?.id})
  
  parsed.whiteLabel = checkLogin?.whiteLabel

  let primaryLuminosity = false
  let secondaryLuminosity = false
  if (checkLogin?.whiteLabel?.primaryColor) {
    primaryLuminosity = isLuminosityAboveThreshold({hexColor: checkLogin?.whiteLabel?.primaryColor, threshold: 0.5});
    parsed.whiteLabel.primaryLuminosity = primaryLuminosity;
  }
  if (checkLogin?.whiteLabel?.secondaryColor) {
    secondaryLuminosity = isLuminosityAboveThreshold({hexColor: checkLogin?.whiteLabel?.secondaryColor, threshold: 0.5});
    parsed.whiteLabel.secondaryLuminosity = secondaryLuminosity;
  }

  parsed.expires = new Date(Date.now() + sessionTimeInSeconds * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function getSession() {
  // session expires 
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}