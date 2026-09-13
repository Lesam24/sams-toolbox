import DashboardLayout from "@/components/layout/DashboardLayout";
import PdfReader from "./PdfReader";

export default function PdfReaderPage() {
    return (
        <DashboardLayout>
            <div className="tool-panel">
                <div className="tool-panel-header">
                    <h1>PDF Reader</h1>
                    <p>Open and read PDF files.</p>
                </div>
            </div>
            <PdfReader />
        </DashboardLayout>
    );
}