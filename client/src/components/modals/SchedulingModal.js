import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@react-md/dialog";

function SchedulingModal({ isOpen, close, fromDate, toDate }) {
  return (
    <Dialog visible={isOpen} onRequestClose={() => close()}>
      <DialogHeader>
        <DialogTitle>Agendar</DialogTitle>
        <DialogContent>
          <p>{"fromDate: " + fromDate}</p>
          <p>{"toDate: " + toDate}</p>
        </DialogContent>
      </DialogHeader>
    </Dialog>
  );
}

export default SchedulingModal;
