import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition h-[68px] px-4">
        <div className="size-20 relative shrink-0">
          <Image src={"/nyvo-logo.svg"} alt="Nyvo logo" fill/> 
        </div>
      </div>
    </Link>
  )
}

export default Logo