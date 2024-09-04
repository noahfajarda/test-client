import { getSession } from "@/utils/auth";
import TicketView from ".";
import { redirect } from "next/navigation";
import { getTicket } from "@/utils/APIRoutes";

export const metadata = {
  title: "Individual Ticket Page | SAM Client",
  description:
    "Individual Ticket for SAM Client",
};

export default async function Page({params}) {
    const session = await getSession();
    if (session === null) redirect("/login");

    const ticketData = await getTicket({clientId: session?.id, ticketId: params?.id})
    
    return <TicketView session={session} ticketData={ticketData} />;
}
