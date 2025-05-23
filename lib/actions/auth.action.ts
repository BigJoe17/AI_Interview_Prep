import { cookies } from "next/headers";
import { db, auth } from "@/firebase/admin";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function Signup(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    // await db.collection('user_interviews').doc(uid).set({
    // //     interviews: [],
    // //     createdAt: new Date().toISOString(),
    // //     updatedAt: new Date().toISOString(),
    // // });
  } catch (error: any) {
    console.error("Error creating User", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "The email address is already in use by another account.",
      };
    }
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await setSessionCookie(idToken);
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: "Error signing in",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
