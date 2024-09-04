import ResetPassword from ".";

export const metadata = {
  title: "Reset Password | SAM Client",
  description:
    "Reset Password for SAM Client",
};

export default async function Page({params} : {params : {id : string}}) {
    return <ResetPassword id={params.id} />;
}