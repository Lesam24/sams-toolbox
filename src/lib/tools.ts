export type Tool = {
    name: string;
    description: string;
    href: string;
    available: boolean;
    category: string;
};

export const tools: Tool[] = [
    {
        name: "PDF Merger",
        description: "Merge multiple PDFs into one",
        href: "/tools/pdf-merger",
        available: true,
        category: "PDF Tools",
    },
    {
        name: "URL Shortener",
        description: "Create a short, shareable URL",
        href: "/tools/url-shortener",
        available: true,
        category: "Miscellaneous",
    },
    {
        name: "PDF Reader",
        description: "View and read PDF files",
        href: "/tools/pdf-reader",
        available: true,
        category: "PDF Tools",
    },
    {
        name: "QR Code Generator",
        description: "Generate QR Codes from URL",
        href: "/tools/qr-generator",
        available: false,
        category: "Miscellaneous",
    }
];