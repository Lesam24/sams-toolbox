import DashboardLayout from "@/components/layout/DashboardLayout";
import { tools } from "@/lib/tools";
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
        <div className="dashboard-header">
            <p className="eyebrow">Sam's Toolbox's Dashboard</p>

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
    </DashboardLayout>
);
}
