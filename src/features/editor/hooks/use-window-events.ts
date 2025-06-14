import { useEvent } from "react-use";

export const useWindowEvents = () => {
  useEvent("beforeunload", (event) => {
    event.preventDefault();

    event.returnValue = "Are you sure you want to leave?";

    return "Are you sure you want to leave?";
  });
};
