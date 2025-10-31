import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PostLoginRouter() {
  const session = await getServerSession(authOptions as any);
  if (!session) redirect("/auth/sign-in");
  const workspaceId = (session as any)?.user?.workspaceId as string | undefined;
  redirect(workspaceId ? "/admin" : "/onboard/workstation");
}
