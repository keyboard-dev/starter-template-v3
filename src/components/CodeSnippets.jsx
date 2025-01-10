import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const CodeSnippets = ({ children }) => {
  // Extract code blocks from MDX structure
  console.log(children)
  const codeBlocks = React.Children.toArray(children)
    .map(child => {
      let childObject = {...child.props.children.props}
      childObject.language = childObject.className.split("::")[0]
      childObject.fileName = childObject.className.split("::")[1]
      return childObject
    })


  console.log("codeBlocks", codeBlocks)
  if (codeBlocks.length === 0) {
    console.warn('No valid code blocks found');
    return null;
  }

  return (
    <div className="mt-[1em]">
      <Tabs defaultValue={`${codeBlocks[0].className}`}>
        <TabsList>
          {codeBlocks.map(({ className, childre, fileName }) => (
            <TabsTrigger 
              key={className} 
              value={className}
            >
              {`${fileName}`}
            </TabsTrigger>
          ))}
        </TabsList>
        {codeBlocks.map(({ className, children, language }) => (
          <TabsContent 
            key={className} 
            value={className}
            className="mt-2"
          >
            <pre>
              <code className={language}>
                {children}
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeSnippets;
