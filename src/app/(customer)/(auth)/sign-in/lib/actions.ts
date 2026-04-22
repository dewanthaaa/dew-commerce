"use server";
import { schemaSignIn } from "@/lib/schema";
import { schemaSignUp } from "@/lib/schema";
import { ActionResult } from "@/types";
import prisma from "../../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignIn(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    console.log(validate);
    return {
      error: validate.error.issues[0].message,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "customer",
    },
  });

  if (!existingUser) {
    return {
      error: "User Email Not Found",
    };
  }
  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password,
  );

  if (!comparePassword) {
    return {
      error: "Email/Password is Incorrect",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}

export async function SignUp(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const validate = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    console.log(validate);
    return {
      error: validate.error.issues[0].message,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: validate.data.email, role: "customer" },
  });

  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  const hashPassword = bcrypt.hashSync(validate.data.password, 12);
  try {
    await prisma.user.create({
      data: {
        name: validate.data.name,
        email: validate.data.email,
        password: hashPassword,
        role: "customer",
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to sign up",
    };
  }

  return redirect("/sign-in");
}
