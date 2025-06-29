"use client";

import { useEffect, useState } from "react";

import FailModal from "@/features/subscriptions/components/fail-modal";
import SubscriptionModal from "@/features/subscriptions/components/subscription-modal";
import SuccessModal from "@/features/subscriptions/components/success-modal";

const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SubscriptionModal />
      <FailModal />
      <SuccessModal />
    </>
  );
};

export default Modals;
