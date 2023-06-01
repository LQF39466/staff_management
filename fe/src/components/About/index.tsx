import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { get } from "../../requests";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Card } from "antd";

const About: React.FC = () => {
  const [data, setdata] = useState<string>("");
  const refresh = false;

  const fetchData = async () => {
    const response: AxiosResponse<any, any> | undefined = await get(
      "/api/about"
    );
    console.log(response);
    if (response !== undefined) {
      const info: string = response.data.about;
      console.log(info);
      setdata(info);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <Card
      style={{
        borderRadius: "10px",
        boxShadow: "4px 4px 8px #eaeaea",
      }}
    >
      <ReactMarkdown
        children={data}
        remarkPlugins={[remarkGfm]}
        components={{
          code({
            node,
            inline,
            className,
            children,
            style,
            ...props
          }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={docco}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </Card>
  );
};
export default About;
