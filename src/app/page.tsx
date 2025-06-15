import { protectServer } from "@/features/auth/utils";

const Home = async () => {
  await protectServer();

  return <div>You are logged in</div>;
};

export default Home;
