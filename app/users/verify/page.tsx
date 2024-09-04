import VerifyUser from ".";

export const metadata = {
  title: "Please Verify Your Account | SAM Client",
  description:
    "Account Verification for SAM Client",
};

export default async function Page() {
    return <VerifyUser/>;
}
