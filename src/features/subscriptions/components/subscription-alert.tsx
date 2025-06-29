"use client";

import { useEffect } from "react";
import { useFailModal } from "../store/use-fail-modal";
import { useSearchParams } from "next/navigation";

const SubscriptionAlert = () => {
  const { onOpen: onOpenFail } = useFailModal();
  const params = useSearchParams();

  const canceled = params.get("canceled");

  useEffect(() => {
    if (canceled) {
      onOpenFail();
    }
  }, [canceled, onOpenFail]);

  return null;
};

export default SubscriptionAlert;
