export type SoftwareShortcut = {
    name: string;
    available: boolean;
    href: string;
    icon: string;
};

export const softwareShortcuts: SoftwareShortcut[] = [
    {
        name: "Photocraft",
        available: true,
        href: "https://app.getartcraft.com/",
        icon: "",
    },
];

export const githubRepositoryUrl = "https://github.com/Lesam24/sams-toolbox";