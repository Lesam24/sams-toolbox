import { PDFDocument } from "pdf-lib";

export async function mergePdfs(files:File[]): Promise<Uint8Array> { // Have to promise Utin8Array since pdf-lib returns a Uint8Array buffer pdf
    if (files.length === 0) {
        throw new Error("No PDF files provided");
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
        );

        for (const page of pages) {
            mergedPdf.addPage(page);
        }
    }

    return mergedPdf.save();
}