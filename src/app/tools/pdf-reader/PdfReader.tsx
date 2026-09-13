"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const PdfViewer = dynamic(
    () => import("./PdfViewer"),
    {
        ssr: false,
        loading: () => (
            <p className="pdf-reader-loading">
                Loading PDF viewer...
            </p>
        ),
    }
);

export default function PdfReader() {
    const [file, setFile] = useState<File | null>(null);

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
    }

    return (
        <div className="pdf-reader">
            <label className="pdf-file-input">
                Browse PDF

                <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                />
            </label>

            {file && (
                <PdfViewer file={file} />
            )}
        </div>
    );
}