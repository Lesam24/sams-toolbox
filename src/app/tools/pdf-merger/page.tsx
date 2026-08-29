import DashboardLayout from "@/components/layout/DashboardLayout";
import PdfMerger from "./PdfMerger";

export default function PdfMergerPage() {
    return (
        <DashboardLayout>
            <div className="tool-panel">
                <div className="tool-panel-header">
                    <h1>PDF Merger</h1>
                    <p>
                        Combine multiple PDF files into a single document.
                    </p>
                </div>

                <PdfMerger />
            </div>
        </DashboardLayout>
    );
}