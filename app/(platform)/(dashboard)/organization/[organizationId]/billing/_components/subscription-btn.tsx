"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

interface SubscriptionBtnProps {
  isPro: boolean;
}

export const SubscriptionBtn = ({ isPro }: SubscriptionBtnProps) => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    console.log("isPro:", isPro);
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };  

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      variant={"primary"}
      className="m-2"
    >
      {isPro ? "Gestionar suscripción." : "Mejorar plan!"}
    </Button>
  );
};
