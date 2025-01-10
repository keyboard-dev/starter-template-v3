import {visit} from 'unist-util-visit';

const plugin = (options) => {
  const transformer = async (ast) => {
    visit(ast, 'text', (node) => {
      // Replace consecutive newlines with paragraph breaks
      if (node.value.includes('\n')) {
        node.value = node.value.replace(/\n\s*\n/g, '\n\n');
        // Replace single newlines with <br/> tags
        node.value = node.value.replace(/([^\n])\n([^\n])/g, '$1<br/>$2');
      }
    });
  };
  return transformer;
};

export default plugin; 