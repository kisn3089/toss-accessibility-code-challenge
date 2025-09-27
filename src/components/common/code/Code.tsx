import { CodeBlock, CodeLayout } from "./Code.style";

type CodeProps<CodeData> = { codeData: CodeData };
export const Code = <CodeData,>({ codeData }: CodeProps<CodeData>) => {
  if (!codeData) return null;

  return (
    <CodeLayout>
      <CodeBlock>{JSON.stringify(codeData, null, 2)}</CodeBlock>
    </CodeLayout>
  );
};
