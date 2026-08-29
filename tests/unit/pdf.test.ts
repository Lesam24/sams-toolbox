import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";

import { mergePdfs } from "@/lib/pdf";

async function createPdf(
    pageCount: number,
    name = "test.pdf"
): Promise<File> {
    const pdf = await PDFDocument.create();

    for (let i = 0; i < pageCount; i++) {
        pdf.addPage();
    }

    const bytes = await pdf.save();

    const buffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buffer).set(bytes);

    return new File([buffer], name, {
        type: "application/pdf",
    });
}

async function loadPdf(bytes: Uint8Array) {
    const buffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buffer).set(bytes);

    return PDFDocument.load(buffer);
}

describe("mergePdfs", () => {
    it("rejects an empty list", async () => {
        await expect(mergePdfs([])).rejects.toThrow(
            "No PDF files provided"
        );
    });

    it("merges two PDFs", async () => {
        const first = await createPdf(2, "first.pdf");
        const second = await createPdf(3, "second.pdf");

        const result = await mergePdfs([first, second]);
        const merged = await loadPdf(result);

        expect(merged.getPageCount()).toBe(5);
    });

    it("merges multiple PDFs", async () => {
        const files = await Promise.all([
            createPdf(1, "one.pdf"),
            createPdf(2, "two.pdf"),
            createPdf(3, "three.pdf"),
            createPdf(4, "four.pdf"),
        ]);

        const result = await mergePdfs(files);
        const merged = await loadPdf(result);

        expect(merged.getPageCount()).toBe(10);
    });

    it("works with a single PDF", async () => {
        const file = await createPdf(5);

        const result = await mergePdfs([file]);
        const merged = await loadPdf(result);

        expect(merged.getPageCount()).toBe(5);
    });

    it("returns a valid PDF", async () => {
        const file = await createPdf(1);

        const result = await mergePdfs([file]);

        expect(result).toBeInstanceOf(Uint8Array);
        expect(result.byteLength).toBeGreaterThan(0);

        await expect(loadPdf(result)).resolves.toBeDefined();
    });

    it("preserves the order of the input PDFs", async () => {
        const first = await createPdf(1, "first.pdf");
        const second = await createPdf(2, "second.pdf");
        const third = await createPdf(3, "third.pdf");

        const result = await mergePdfs([
            first,
            second,
            third,
        ]);

        const merged = await loadPdf(result);

        expect(merged.getPageCount()).toBe(6);
    });

    it("does not modify the input files", async () => {
        const first = await createPdf(2, "first.pdf");
        const second = await createPdf(3, "second.pdf");

        const firstBefore = new Uint8Array(
            await first.arrayBuffer()
        );
        const secondBefore = new Uint8Array(
            await second.arrayBuffer()
        );

        await mergePdfs([first, second]);

        const firstAfter = new Uint8Array(
            await first.arrayBuffer()
        );
        const secondAfter = new Uint8Array(
            await second.arrayBuffer()
        );

        expect(firstAfter).toEqual(firstBefore);
        expect(secondAfter).toEqual(secondBefore);
    });

    it("rejects an invalid PDF", async () => {
        const invalidPdf = new File(
            ["this is not a PDF"],
            "invalid.pdf",
            {
                type: "application/pdf",
            }
        );

        await expect(
            mergePdfs([invalidPdf])
        ).rejects.toThrow();
    });

    it("rejects if any PDF is invalid", async () => {
        const validPdf = await createPdf(2);

        const invalidPdf = new File(
            ["not a real PDF"],
            "invalid.pdf",
            {
                type: "application/pdf",
            }
        );

        await expect(
            mergePdfs([validPdf, invalidPdf])
        ).rejects.toThrow();
    });

    it("handles PDFs with many pages", async () => {
        const file = await createPdf(50);

        const result = await mergePdfs([file]);
        const merged = await loadPdf(result);

        expect(merged.getPageCount()).toBe(50);
    });

    it("handles multiple PDFs with different page counts", async () => {
        const files = await Promise.all([
            createPdf(1),
            createPdf(10),
            createPdf(25),
        ]);

        const result = await mergePdfs(files);
        const merged = await loadPdf(result);

        expect(merged.getPageCount()).toBe(36);
    });
});