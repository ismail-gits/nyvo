import { auth } from "@/auth"

const Home = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default Home