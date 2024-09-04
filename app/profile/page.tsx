import { getSession } from "@/utils/auth";
import Profile from ".";
import { redirect } from "next/navigation";
import { userMiddleware } from "@/utils/APIRoutes";

export const metadata = {
  title: "Profile Page | SAM Client",
  description:
    "Profile for SAM Client",
};

export default async function Page() {
    const session = await getSession();
    if (session === null) redirect("/login");

    const user = await userMiddleware({clientId: session?.id, paymentInfo: true})


    return <Profile session={session} data={{user}} />;
}