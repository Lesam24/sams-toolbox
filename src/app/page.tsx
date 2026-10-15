import DashboardLayout from "@/components/layout/DashboardLayout";
import { MarkGithubIcon } from "@primer/octicons-react";
import { tools } from "@/lib/tools";
import { githubRepositoryUrl, softwareShortcuts } from "@/lib/shortcuts";
import Link from "next/link";

export default function Home() {
const availableTools = tools.filter(
(tool) => tool.available
);

const categories = [
    ...new Set(
        availableTools.map((tool) => tool.category)
    ),
];

return (
    <DashboardLayout>
        <div className="home-dashboard">
            <div className="home-dashboard-content">
                <div className="dashboard-header">
                    <p className="eyebrow">Sam&apos;s Toolbox Dashboard</p>

                    <h1>Everyday tools.</h1>

                    <p>
                        A collection of everyday needs, to make life simpler.
                    </p>
                </div>

                {categories.map((category) => (
                    <section
                        key={category}
                        className="tool-category"
                    >
                        <h2 className="tool-category-title">
                            {category}
                        </h2>

                        <div className="tool-grid">
                            {availableTools
                                .filter(
                                    (tool) =>
                                        tool.category === category
                                )
                                .map((tool) => (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="tool-card"
                                    >
                                        <h2>{tool.name}</h2>

                                        <p>
                                            {tool.description}
                                        </p>

                                        <span>
                                            Open tool
                                        </span>
                                    </Link>
                                ))}
                        </div>
                    </section>
                ))}
            </div>

            <footer className="dashboard-shortcuts">
                <section className="software-shortcuts" aria-labelledby="software-shortcuts-title">
                    <h2 id="software-shortcuts-title">Software shortcuts</h2>
                    <div className="software-shortcut-list">
                        {softwareShortcuts.map((shortcut) => (
                            shortcut.available ? (
                                <a
                                    key={shortcut.name}
                                    className="software-shortcut"
                                    href={shortcut.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="software-shortcut-icon" aria-hidden="true">{shortcut.icon}</span>
                                    <span>{shortcut.name}</span>
                                </a>
                            ) : (
                                <div key={shortcut.name} className="software-shortcut unavailable" aria-disabled="true">
                                    <span className="software-shortcut-icon" aria-hidden="true">{shortcut.icon}</span>
                                    <span>{shortcut.name}</span>
                                    <span className="software-shortcut-status">Unavailable</span>
                                </div>
                            )
                        ))}
                    </div>
                </section>

                <a
                    className="github-shortcut"
                    href={githubRepositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub repository"
                    title="GitHub repository"
                >
                    <MarkGithubIcon aria-hidden="true" />
                </a>
            </footer>
        </div>
    </DashboardLayout>
);
}
