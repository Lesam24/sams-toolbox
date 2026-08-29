"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import ThemeToggle from "./ThemeToogle";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <Link href="./">
                Sam's Toolbox
                </Link>
            </div>
            <nav className="sidebar-nav">
                <Link href="/" className="sidebar-link">
                  Dashboard
                </Link>

                <div className="sidebar-section">
                    <span>Tools</span>
                </div>

                {tools.map((tool) => (
                    <Link key={tool.href} href={tool.available ? tool.href : "#"} className={`sidebar-link ${!tool.available ? "disabled" : ""}`} aria-disabled= {!tool.available}>
                        {tool.name}

                        {!tool.available && (<span className="coming-soon">
                            Soon
                        </span>)}
                    </Link>
                ))}
            </nav>
            
            <ThemeToggle />
        </aside>
    );
}