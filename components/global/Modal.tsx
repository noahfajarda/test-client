"use client"

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";

export default function ModalComponent({button, header, body, isIconOnly, size, disclosure}: {button: React.ReactNode; header: string; body: React.ReactNode; isIconOnly: boolean; size?: "sm" | "md" | "lg" | "full" | "xl" | "xs" | "2xl" | "3xl" | "4xl" | "5xl";}) {
  let isOpen, onOpen, onOpenChange;
  const uniqueDisclosure = useDisclosure()
  if (disclosure) {
    isOpen = disclosure.isOpen;
    onOpen = disclosure.onOpen;
    onOpenChange = disclosure.onOpenChange;
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  } else {
    isOpen = uniqueDisclosure.isOpen;
    onOpen = uniqueDisclosure.onOpen;
    onOpenChange = uniqueDisclosure.onOpenChange;
  }
  return (
    <>
      {isIconOnly ? (
        <Button isIconOnly={isIconOnly} onPress={disclosure ? disclosure.onOpen : onOpen} size="sm" radius="full">{button}</Button>
      ) : (
        <div className="inline" onClick={onOpen}>{button}</div>
      )}
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top" size={size ? size : "xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"><span className="text-2xl">{header}</span></ModalHeader>
              <ModalBody>
                {body}
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}