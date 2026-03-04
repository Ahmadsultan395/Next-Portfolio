"use client";

import React from "react";
import { ActionButton } from ".";

interface DeleteConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      style={{ zIndex: 100 }}
    >
      <div className="p-5 bg-zinc-900 border border-red-800/30 rounded-md shadow-lg w-1/3 flex flex-col justify-center items-center">
        <div className="text-sm font-semibold mb-3 text-white">
          ⚠️ Are you sure? This cannot be undone.
        </div>

        <div className="flex gap-2.5 justify-end">
          <ActionButton
            label="Yes, Delete"
            variant="danger"
            onClick={onConfirm}
          />
          <ActionButton label="Cancel" variant="secondary" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
