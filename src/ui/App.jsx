import { useState, useEffect } from "react";
import ReactFlow, { Controls, MiniMap, Background } from "react-flow-renderer";
import * as d3 from "d3";

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const data = {
      id: "root",
      name: "Root",
      children: [
        { id: "file-root-1", name: "file-root-1.txt", size: 827 },
        {
          id: "folder1",
          name: "Folder 1",
          children: [
            { id: "file-1b", name: "file-1b.txt", size: 510 },
            {
              id: "folderBooks",
              name: "Books",
              children: [
                { id: "1499123", name: "millionaire-fastlane.pdf", size: 888 }
              ]
            }
          ]
        },
        {
          id: "folder2",
          name: "Folder 2",
          children: [
            { id: "file-2a", name: "file-2a.txt", size: 786 }
          ]
        }
      ]
    };

    const root = d3.hierarchy(data); // constructs hierarchy

    const treeLayout = d3.tree() // d3.tree() is a factory function

    treeLayout.nodeSize([180, 130]);

    treeLayout(root);

    console.log("Root: ", root);
    console.log("root descendant: ", root.descendants()[1].children)


    const flowNodes = root.descendants().map((descendant) => { // react flow nodes
      const isFile = !descendant.children; // set to true if no children exist.
      const label = isFile
        ? `${descendant.data.name}\n${descendant.data.size} KB` // is a file
        : descendant.data.name;   // is a folder

      return {
        id: descendant.data.id,
        data: { label },
        position: { x: descendant.x, y: descendant.y }, // y is 0 at root and increases with depth
      };
    });

    console.log("flowNodes: ", flowNodes);

    console.log("root.links(): ", root.links())

    const flowEdges = root.links().map((link) => ({
      id: `e${link.source.data.id}-${link.target.data.id}`,
      source: link.source.data.id,
      target: link.target.data.id
    }));

    setNodes(flowNodes);  // updating state
    setEdges(flowEdges);  // updating state
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}  // state
        edges={edges}  // state
        nodeTypes
        fitView
        panOnDrag
        zoomOnScroll
        zoomOnPinch
      >
      <Controls />
      <MiniMap />
      <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
