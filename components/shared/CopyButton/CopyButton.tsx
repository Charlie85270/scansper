import React, { useState } from "react";
import { FiCopy, FiCheckSquare } from "react-icons/fi";

export default function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        // changing back to default state after 2 seconds.
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      err => {
        console.log("failed to copy", err.mesage);
      }
    );
  };
  return (
    <div className="text-center">
      <button
        onClick={copyToClipboard}
        className="p-2 text-sm transition rounded"
      >
        {copied ? (
          <FiCheckSquare className="text-green-400" />
        ) : (
          <FiCopy className="text-gray-400" />
        )}
      </button>
    </div>
  );
}
