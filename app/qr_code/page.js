// app/qr/page.js

"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const [receiptUrl, setReceiptUrl] = useState("https://yourdomain.com/receipt/12345");

  const handleSendEmail = async () => {
    const canvas = document.getElementById("qrCanvas");
    const qrCodeData = canvas.toDataURL("image/png");

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrCodeData }),
    });

    const data = await response.json();
    alert(data.message); // Success or failure message
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Scan to View Receipt</h1>
      <QRCodeCanvas id="qrCanvas" value={receiptUrl} size={256} />
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded" onClick={handleSendEmail}>
        Send QR Code to Email
      </button>
    </div>
  );
}