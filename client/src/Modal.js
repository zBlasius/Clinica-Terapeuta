import React from 'react';
import { Dialog, DialogHeader, DialogTitle } from "@react-md/dialog";
import { useToggle } from "@react-md/utils";

export default function Demo({isOpen}) {
  // const [toggled, enable, disable] = useToggle(isOpen);
  return (
      <Dialog
        id="dialog-1"
        visible={isOpen}
        // onRequestClose={disable}
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Example</DialogTitle>
        </DialogHeader>
        
      </Dialog>
  );
}