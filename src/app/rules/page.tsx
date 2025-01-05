import { Metadata } from "next";
import { getMarkdownData } from "@/app/helper";
import Columns from "../Columns";
import Sidebar from "../Sidebar";

export const metadata: Metadata = {
  title: "Rules",
};

export default async function RulesPage() {
  const contentHtml = await getMarkdownData("public/rules.md");
  return (
    <Columns>
      <Sidebar />
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </Columns>
  );
}
