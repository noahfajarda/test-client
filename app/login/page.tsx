import { getSession } from "@/utils/auth";
import Login from ".";
import { redirect } from "next/navigation";
import { getFirmBranding } from "@/utils/APIRoutes";

export const metadata = {
  title: "Log In | SAM Client",
  description:
    "Log In for SAM Client",
};

export default async function Page({searchParams}: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    const session = await getSession();
    if (session !== null) redirect("/tickets");

    let firmBranding;
    if (searchParams?.firmId) {
      firmBranding = await getFirmBranding({firmId: searchParams?.firmId})
    }
      
    return <Login firmBranding={firmBranding} />;
}