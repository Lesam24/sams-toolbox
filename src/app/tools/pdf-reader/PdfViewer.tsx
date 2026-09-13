"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type PdfViewerProps = {
    file: File;
};

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.1;

export default function PdfViewer({
    file,
}: PdfViewerProps) {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            "pdfjs-dist/build/pdf.worker.min.mjs",
            import.meta.url
        ).toString();
    }, []);

    function handleDocumentLoadSuccess({
        numPages,
    }: {
        numPages: number;
    }) {
        setNumPages(numPages);
        setPageNumber(1);
        setError(null);
    }

    function handleDocumentLoadError() {
        setError("Could not load this PDF.");
        setNumPages(0);
    }

    function previousPage() {
        setPageNumber((current) =>
            Math.max(1, current - 1)
        );
    }

    function nextPage() {
        setPageNumber((current) =>
            Math.min(numPages, current + 1)
        );
    }

    function decreaseZoom() {
        setScale((current) =>
            Math.max(
                MIN_SCALE,
                Number(
                    (current - SCALE_STEP).toFixed(2)
                )
            )
        );
    }

    function increaseZoom() {
        setScale((current) =>
            Math.min(
                MAX_SCALE,
                Number(
                    (current + SCALE_STEP).toFixed(2)
                )
            )
        );
    }

    return (
        <div className="pdf-reader-document">
            <p className="pdf-reader-file">
                {file.name}
            </p>

            {error && (
                <p className="tool-error">
                    {error}
                </p>
            )}

            {!error && (
                <Document
                    file={file}
                    onLoadSuccess={handleDocumentLoadSuccess}
                    onLoadError={handleDocumentLoadError}
                    loading={
                        <p className="pdf-reader-loading">
                            Loading PDF...
                        </p>
                    }
                >
                    <div className="pdf-reader-toolbar">
                        <div className="pdf-reader-navigation">
                            <button
                                type="button"
                                onClick={previousPage}
                                disabled={pageNumber <= 1}
                            >
                                Previous
                            </button>

                            <span>
                                {pageNumber} / {numPages}
                            </span>

                            <button
                                type="button"
                                onClick={nextPage}
                                disabled={
                                    pageNumber >= numPages
                                }
                            >
                                Next
                            </button>
                        </div>

                        <div className="pdf-reader-zoom">
                            <button
                                type="button"
                                onClick={decreaseZoom}
                                disabled={
                                    scale <= MIN_SCALE
                                }
                            >
                                −
                            </button>

                            <span>
                                {Math.round(scale * 100)}%
                            </span>

                            <button
                                type="button"
                                onClick={increaseZoom}
                                disabled={
                                    scale >= MAX_SCALE
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="pdf-reader-page">
                        {numPages > 0 && (
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                renderTextLayer
                                renderAnnotationLayer
                            />
                        )}
                    </div>
                </Document>
            )}
        </div>
    );
}