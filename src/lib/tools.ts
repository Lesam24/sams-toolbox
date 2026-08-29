export type Tool = {
    name: string;
    description: string;
    href: string;
    available: boolean;
};

export const tools: Tool[] = [
    {
        name: "URL Shortener",
        description: "Create a short, shareable URL",
        href: "/tools/url-shortener",
        available: true,
    },
    {
        name: "PDF Merger",
        description: "Merge multiple PDFs into one",
        href: "/tools/pdf-merger",
        available: true,
    },
    {
        name: "QR Code Generator",
        description: "Generate QR Codes from URL",
        href: "/tools/qr-generator",
        available: false,
    }
];