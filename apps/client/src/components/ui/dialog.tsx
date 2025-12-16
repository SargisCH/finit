import { Box, Button, Dialog, Flex } from "@chakra-ui/react";
import { CompanyEvaluationResponse } from "@shared/schemas";
import { Trans } from "react-i18next";
import { currencyFormat } from "../../utils";

type Props = {
  open: boolean;
  onClose: () => void;
  data: CompanyEvaluationResponse | undefined;
};

export default function DialogCustom({ open, onClose, data }: Props) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title />
          </Dialog.Header>
          <Dialog.Body></Dialog.Body>
          <Dialog.Footer>
            <Flex justifyContent={"end"} gap={4}>
              <Button onClick={onClose} variant={"subtle"}>
                <Trans i18nKey="close" />
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
