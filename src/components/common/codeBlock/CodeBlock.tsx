import { Code, CodeLayout } from "./CodeBlock.style";

type CodeBlockProps<CodeData> = { codeData: CodeData };
export const CodeBlock = <CodeData,>({
  codeData,
}: CodeBlockProps<CodeData>) => {
  if (!codeData) return null;

  return (
    <CodeLayout>
      <Code>{JSON.stringify(codeData, null, 2)}</Code>
    </CodeLayout>
  );
};
