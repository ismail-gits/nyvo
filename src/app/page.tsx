import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";

const Home = async () => {
  await protectServer();

  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};

export default Home;
