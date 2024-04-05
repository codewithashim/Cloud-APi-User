import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <section>
      <h1>Home</h1>
    </section>
  );
}
