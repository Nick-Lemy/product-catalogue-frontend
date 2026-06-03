"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface RejectFormValues {
  reason: string;
}

interface RejectDialogProps {
  open: boolean;
  assetTitle: string;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

function RejectDialog({
  open,
  assetTitle,
  isSubmitting,
  onClose,
  onConfirm,
}: RejectDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectFormValues>();

  function handleClose() {
    reset();
    onClose();
  }

  function submit(data: RejectFormValues) {
    onConfirm(data.reason);
    reset();
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && handleClose()}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Reject "{assetTitle}"</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top={3} right={3} />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <form id="reject-form" onSubmit={handleSubmit(submit)}>
                <Field.Root invalid={!!errors.reason} required>
                  <Field.Label>
                    Reason <Field.RequiredIndicator />
                  </Field.Label>
                  <Textarea
                    rows={3}
                    resize="none"
                    placeholder="Explain why this asset is being rejected..."
                    {...register("reason", {
                      required: "A reason is required",
                      minLength: {
                        value: 5,
                        message: "Please give a clearer reason",
                      },
                    })}
                  />
                  <Field.HelperText>
                    The uploader will see this reason.
                  </Field.HelperText>
                  <Field.ErrorText>{errors.reason?.message}</Field.ErrorText>
                </Field.Root>
              </form>
            </Dialog.Body>
            <Dialog.Footer gap={2}>
              <Button variant="outline" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="reject-form"
                size="sm"
                colorPalette="red"
                loading={isSubmitting}
              >
                Reject Asset
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default RejectDialog;
