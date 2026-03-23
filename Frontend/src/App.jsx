import { useState, useCallback } from 'react';
import { ReactFlow, Background, applyNodeChanges, applyEdgeChanges, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';

import InputNode from './Components/InputNode';
import ResultNode from './Components/ResultNode';
import Navbar from './Components/Navbar';

const nodeTypes = { inputNode: InputNode, resultNode: ResultNode };

const initialNodes = [
  { id: 'input', type: 'inputNode', position: { x: 100, y: 180 }, data: { currentPrompt: '' } },
  { id: 'output', type: 'resultNode', position: { x: 580, y: 180 }, data: { result: '' } },
];
const initialEdges = [
  { id: 'e1-2', source: 'input', target: 'output', animated: true, className: '!stroke-[#6366f1] !stroke-[1.5px]' },
];

function AppFlow({ theme, setTheme }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [saveStatus, setSaveStatus] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const isDark = theme === 'dark';
  const onNodesChange = useCallback((c) => setNodes((n) => applyNodeChanges(c, n)), []);
  const onEdgesChange = useCallback((c) => setEdges((e) => applyEdgeChanges(c, e)), []);

  const handleReset = () => {
    setNodes(nds => nds.map(n => {
      if (n.id === 'input') return { ...n, data: { ...n.data, currentPrompt: '' } };
      if (n.id === 'output') return { ...n, data: { ...n.data, result: '' } };
      return n;
    }));
  };

  const handleSave = async () => {
    const prompt = nodes.find(n => n.id === 'input')?.data?.currentPrompt;
    const response = nodes.find(n => n.id === 'output')?.data?.result;
    if (!prompt || !response || response === 'Loading...') {
      setSaveStatus('nothing'); setTimeout(() => setSaveStatus(''), 2000); return;
    }
    try {
      setSaveStatus('saving');
      await axios.post('https://runflow-ai.onrender.com/api/save', { prompt, response });
      setSaveStatus('saved');
    } catch { setSaveStatus('error'); }
    setTimeout(() => setSaveStatus(''), 2200);
  };

  const nodesWithTheme = nodes.map(n => ({ ...n, data: { ...n.data, theme } }));

  return (
    <div className="h-screen w-full flex flex-col text-slate-200" style={{ backgroundColor: isDark ? '#03060D' : '#f0f2f5' }}>
      <Navbar 
        isDark={isDark} setTheme={setTheme} 
        isLocked={isLocked} setIsLocked={setIsLocked}
        zoomOut={zoomOut} zoomIn={zoomIn} fitView={fitView}
        saveStatus={saveStatus} handleSave={handleSave} handleReset={handleReset}
      />
      <div className="flex-1 w-full">
        <ReactFlow
          nodes={nodesWithTheme}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={!isLocked}
          nodesConnectable={!isLocked}
          elementsSelectable={!isLocked}
          panOnDrag={!isLocked}
          zoomOnScroll={!isLocked}
          proOptions={{ hideAttribution: true }}
          className={isDark ? 'bg-[#0c0e14]' : 'bg-[#f0f2f5]'}
        >
          <Background color={isDark ? '#1e2535' : '#d1d5db'} gap={26} size={1} variant="dots" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ReactFlowProvider>
      <AppFlow theme={theme} setTheme={setTheme} />
    </ReactFlowProvider>
  );
}
