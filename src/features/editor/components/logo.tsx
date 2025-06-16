import Link from "next/link";
import Image from "next/image";

import React from 'react'

const Logo = () => {
  return (
    <Link href="/">
      <div className="size-20 relative shrink-0">
        <Image src={'/nyvo-logo.svg'} fill alt="Nyvo Logo" className="shrink-0 hover:opacity-75 transition"/>
      </div>
    </Link>
  )
}

export default Logo