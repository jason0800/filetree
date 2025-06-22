import { useState, useEffect } from "react";
import ReactFlow from "react-flow-renderer";
import * as d3 from "d3";

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const data = {
      id: "root",
      name: "Root",
      children: [
        { id: "file-root-1", name: "file-root-1.txt", size: 345 },
        { id: "file-root-2", name: "file-root-2.txt", size: 827 },
        {
          id: "folder1",
          name: "Folder 1",
          children: [
            { id: "file-1a", name: "file-1a.txt", size: 231 },
            { id: "file-1b", name: "file-1b.txt", size: 510 },
            {
              id: "folderBooks",
              name: "Books",
              children: [
                { id: "1499123", name: "millionaire-fastlane.pdf", size: 888 },
                { id: "414953644", name: "3% man.pdf", size: 123 },
                { id: "532542", name: "The Silk Roads.pdf", size: 456 }
              ]
            }
          ]
        },
        {
          id: "folder2",
          name: "Folder 2",
          children: [
            { id: "file-2a", name: "file-2a.txt", size: 786 },
            { id: "file-2b", name: "file-2b.txt", size: 102 }
          ]
        }
      ]
    };

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().nodeSize([180, 120]);
    treeLayout(root);

    const flowNodes = root.descendants().map((d) => {
      const isFile = !d.children;
      const label = isFile
        ? `${d.data.name}\n${d.data.size} KB`
        : d.data.name;

      return {
        id: d.data.id,
        data: { label },
        position: { x: d.x, y: d.y },
      };
    });

    const flowEdges = root.links().map((link) => ({
      id: `e${link.source.data.id}-${link.target.data.id}`,
      source: link.source.data.id,
      target: link.target.data.id
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes
        fitView
        panOnDrag
        zoomOnScroll
        zoomOnPinch
      />
    </div>
  );
}

export default App;
