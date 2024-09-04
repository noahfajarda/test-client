import { getSession } from "@/utils/auth";
import Tickets from ".";
import { redirect } from "next/navigation";
import { getRecentTicketType, getUserTickets } from "@/utils/APIRoutes";

export const metadata = {
  title: "Ticket Page | SAM Client",
  description:
    "Tickets for SAM Client",
};

export default async function Page() {
    const session = await getSession();
    if (session === null) redirect("/login");

    // get tickets
    const {tickets} = await getUserTickets({id: session?.id})

    // if on dashboard, get the 1040, estate plan, and tax plan
    const mostRecent1040 = await getRecentTicketType({id: session?.id, type: "1040"})
    const mostRecentEstatePlan = await getRecentTicketType({id: session?.id, type: "Estate Planning"})
    const mostRecentTaxPlan = await getRecentTicketType({id: session?.id, type: "Tax Planning"})

    return <Tickets session={session} data={{tickets, mostRecent1040, mostRecentEstatePlan, mostRecentTaxPlan}} />;
}
