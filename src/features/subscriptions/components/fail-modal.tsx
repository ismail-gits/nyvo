import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Logo from "@/app/(dashboard)/logo";
import { Button } from "@/components/ui/button";
import { useCheckout } from "../api/use-checkout";
import { useFailModal } from "../store/use-fail-modal";
import { useRouter } from "next/navigation";

const FailModal = () => {
  const mutation = useCheckout();
  const { isOpen, onClose } = useFailModal();
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-2">
          <Logo />
          <DialogTitle>Something went wrong</DialogTitle>
          <DialogDescription>
            We couldn't process your payment
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-2 gap-y-4">
          <Button className="w-full" onClick={handleClose}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FailModal;
