import { getMarkdownData } from "@/app/helper";

export default async function RulesPage() {
  const contentHtml = await getMarkdownData("public/rules.md");
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
