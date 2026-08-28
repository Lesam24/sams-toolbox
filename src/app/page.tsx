import DashboardLayout from "@/components/layout/DashboardLayout";

import { tools } from "@/lib/tools";
import Link from "next/link";


export default function Home() {
    const availableTools = tools.filter(
        (tool) => tool.available
    );

    return (
        <DashboardLayout>
            <div className="dashboard-header">
                <p className="eyebrow">Sam's Toolbox's Dashboard</p>
                
                <h1>Everyday tools.</h1>

                <p>A collection of everyday needs, to make life simpler.</p>
            </div>

            <section className="tool-grid">
                {availableTools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="tool-card">
                        <h2>{tool.name}</h2>
                        <p>{tool.description}</p>
                        <span> Open tool</span>
                    </Link>
                ))}
            </section>
        </DashboardLayout>
    );
}