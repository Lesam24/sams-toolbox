import { ReactNode } from "react";

import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <div className="dashboard">
            <Sidebar />
            <main className="dashboard-content">
                {children}
            </main>
        </div>
    );
}