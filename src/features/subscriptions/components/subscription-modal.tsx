import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSubscriptionModal } from "../store/use-subscription-modal";
import Logo from "@/app/(dashboard)/logo";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "../api/use-checkout";

const SubscriptionModal = () => {
  const mutation = useCheckout();
  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-2">
          <Logo />
          <DialogTitle>Upgrade to a paid plan</DialogTitle>
          <DialogDescription>
            Upgrade to a paid plan to unlock more features
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited Projects</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited Templates</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              AI Background Removal
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">AI Image Generation</p>
          </li>
        </ul>
        <DialogFooter className="p-2 gap-y-4">
          <Button
            className="w-full"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
