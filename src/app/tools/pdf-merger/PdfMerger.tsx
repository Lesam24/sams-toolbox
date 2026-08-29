"use client";

import { useState } from "react";

import { mergePdfs } from "@/lib/pdf";

export default function PdfMerger() {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [merging, setMerging] = useState<boolean>(false);

    function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        setError(null);
        setFiles(Array.from(event.target.files));
    }

    function removeFile(index: number) {
        setFiles((current) =>
            current.filter((_, i) => i !== index)
        );
    }

    function moveFile(index: number, direction: -1 | 1) {
        setFiles((current) => {
            const newFiles = [...current];
            const targetIndex = index + direction;

            if (
                targetIndex < 0 ||
                targetIndex >= newFiles.length
            ) {
                return current;
            }

            [newFiles[index], newFiles[targetIndex]] = [
                newFiles[targetIndex],
                newFiles[index],
            ];

            return newFiles;
        });
    }

    async function handleMerge() {
        if (files.length === 0) {
            setError("Select at least one PDF.");
            return;
        }

        try {
            setError(null);
            setMerging(true);

            const bytes = await mergePdfs(files);

            const buffer = new ArrayBuffer(bytes.byteLength);
            new Uint8Array(buffer).set(bytes);

            const blob = new Blob([new Uint8Array(bytes)], { // Have to cast Utin8Array since pdf-lib returns a Uint8Array buffer pdf
                type: "application/pdf",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "merged.pdf";
            link.click();

            URL.revokeObjectURL(url);
        } catch {
            setError(
                "Something went wrong while merging the PDFs."
            );
        } finally {
            setMerging(false);
        }
    }

    const mergeDisabled: boolean =
        files.length === 0 || merging;

    return (
        <div className="tool-merger">
            <label className="pdf-file-input">
                Browse PDFs
                <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFiles}
                />
            </label>

            {files.length > 0 && (
                <div className="pdf-file-list">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${file.size}-${index}`}
                            className="pdf-file"
                        >
                            <span>{file.name}</span>

                            <div className="pdf-file-actions">
                                <button
                                    type="button"
                                    onClick={() =>
                                        moveFile(index, -1)
                                    }
                                    disabled={index === 0}
                                    aria-label={`Move ${file.name} up`}
                                >
                                    ↑
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        moveFile(index, 1)
                                    }
                                    disabled={
                                        index === files.length - 1
                                    }
                                    aria-label={`Move ${file.name} down`}
                                >
                                    ↓
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeFile(index)
                                    }
                                    aria-label={`Remove ${file.name}`}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="tool-error">
                    {error}
                </p>
            )}

            <button
                type="button"
                onClick={handleMerge}
                disabled={mergeDisabled}
            >
                {merging ? "Merging..." : "Merge PDFs"}
            </button>
        </div>
    );
}