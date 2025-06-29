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
import { useSuccessModal } from "../store/use-success-modal";
import { useRouter } from "next/navigation";

const SuccessModal = () => {
  const { isOpen, onClose } = useSuccessModal();
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
          <DialogTitle>Subscription successfull!</DialogTitle>
          <DialogDescription>
            You have successfully subscribed to Nyvo
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

export default SuccessModal;
