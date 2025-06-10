import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.ai)["remove-bg"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.ai)["remove-bg"]["$post"]
>["json"];

export const useRemoveBackground = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai["remove-bg"].$post({ json });

      if (!response.ok) {
        throw new Error("Failed to remove background image");
      }

      return await response.json();
    },
  });

  return mutation;
};
