import { auth, signOut } from "@/auth";

const Dashbaord = async () => {
    const sessions = await auth();
    return (
        <>
            {JSON.stringify(sessions)}
            <form action={async () => {
                "use server"
                await signOut();
            }}>
                <button type="submit">
                    Sigout
                </button>
            </form>
        </>
    )
}
export default Dashbaord;