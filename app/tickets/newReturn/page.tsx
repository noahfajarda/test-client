import { getSession } from "@/utils/auth";
import NewReturn from ".";
import { redirect } from "next/navigation";
import { userMiddleware } from "@/utils/APIRoutes";

export const metadata = {
  title: "My Tax Return | SAM Client",
  description:
    "New Return for SAM Client",
};

export default async function Page() {
    const session = await getSession();
    if (session === null) redirect("/login");

    const userData = await userMiddleware({clientId: session?.id, paymentInfo: false})

    return <NewReturn session={session} userData={userData} />;
}
