export type SoftwareShortcut = {
    name: string;
    available: boolean;
    href: string;
    icon: string;
};

export const softwareShortcuts: SoftwareShortcut[] = [
    {
        name: "Artcraft",
        available: true,
        href: "https://app.getartcraft.com/",
        icon: "",
    },
    {
        name: "DevDocs",
        available: true,
        href: "https://devdocs.io/",
        icon: "",
    },
    {
        name: "Figma",
        available: true,
        href: "https://www.figma.com/",
        icon: "",
    },
];

export const githubRepositoryUrl = "https://github.com/Lesam24/sams-toolbox";