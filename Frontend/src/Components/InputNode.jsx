import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit3, FiPlay, FiLoader } from "react-icons/fi";

export default function InputNode({ id, data }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { setNodes } = useReactFlow();
  const isDark = data?.theme === "dark";

  useEffect(() => {
    if (data?.currentPrompt === "") {
      setPrompt("");
    }
  }, [data?.currentPrompt]);

  const handleRun = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);

    setNodes((nds) =>
      nds.map((n) =>
        n.id === "output"
          ? { ...n, data: { ...n.data, result: "Loading..." } }
          : n,
      ),
    );

    try {
      const res = await axios.post(
        "https://runflow-ai.onrender.com/api/ask-ai",
        { prompt },
      );
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === "output")
            return { ...n, data: { ...n.data, result: res.data.response } };
          if (n.id === id)
            return { ...n, data: { ...n.data, currentPrompt: prompt } };
          return n;
        }),
      );
    } catch {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === "output"
            ? { ...n, data: { ...n.data, result: "Error fetching response" } }
            : n,
        ),
      );
    }
    setLoading(false);
  };

  const nodeBg = isDark ? "bg-[#161a22]" : "bg-white";
  const nodeBorder = isDark ? "border-[#252b38]" : "border-[#e2e5ea]";
  const nodeShadow = isDark
    ? "shadow-[0_1px_3px_rgba(0,0,0,0.4),0_4px_24px_rgba(0,0,0,0.4)]"
    : "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]";
  const headerBg = isDark ? "bg-[#1c2130]" : "bg-[#f7f8fa]";
  const headerBdr = isDark ? "border-[#252b38]" : "border-[#e2e5ea]";
  const labelColor = isDark ? "text-[#4d5668]" : "text-[#9ba3ae]";
  const hintColor = isDark ? "text-[#4d5668]" : "text-[#9ba3ae]";
  const nodeTitle = isDark ? "text-[#8b95a8]" : "text-[#5a606b]";
  const badgeCls = isDark
    ? "bg-[#1e2040] text-[#818cf8] border-[#252b38]"
    : "bg-[#eeeeff] text-[#5b5ef4] border-[#e2e5ea]";
  const textareaBg = isDark
    ? "bg-[#1c2130] border-[#252b38] text-[#eef0f4]"
    : "bg-[#f0f2f5] border-[#e2e5ea] text-[#0d0f12]";
  const phColor = isDark
    ? "placeholder:text-[#4d5668]"
    : "placeholder:text-[#9ba3ae]";
  const disabledBtn = isDark
    ? "bg-[#222738] text-[#4d5668]"
    : "bg-[#e8eaed] text-[#9ba3ae]";

  return (
    <div
      className={`w-72 rounded-xl overflow-hidden border ${nodeBg} ${nodeBorder} ${nodeShadow}`}
    >
      <div
        className={`flex items-center gap-2 px-3 py-[9px] border-b ${headerBg} ${headerBdr}`}
      >
        <div className="w-[22px] h-[22px] rounded-md bg-[#6366f1] flex items-center justify-center shrink-0">
          <FiEdit3 className="text-white text-xs" />
        </div>
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.06em] ${nodeTitle}`}
        >
          Input Node
        </span>
        <span
          className={`ml-auto text-[10px] font-semibold px-[7px] py-[2px] rounded border ${badgeCls}`}
        >
          Prompt
        </span>
      </div>

      <div className="p-3 pb-[14px]">
        <label
          className={`block text-[11px] font-semibold uppercase tracking-[0.05em] mb-1.5 ${labelColor}`}
        >
          Your prompt
        </label>
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleRun();
          }}
          placeholder="Describe your task..."
          className={`w-full rounded-lg text-[13px] leading-relaxed px-[10px] py-2 resize-none outline-none border transition-all duration-150 focus:border-[#6366f1] focus:shadow-[0_0_0_3px_#1e2040] ${textareaBg} ${phColor}`}
        />
        <p className={`text-[10px] mt-1 mb-2.5 ${hintColor}`}>
          Ctrl + Enter to run
        </p>
        <button
          onClick={handleRun}
          disabled={loading || !prompt.trim()}
          className={`w-full cursor-pointer flex items-center border-none justify-center gap-1.5 text-[12px] font-semibold py-[7px] rounded-lg transition-colors duration-150 tracking-[0.01em] ${
            loading || !prompt.trim()
              ? `cursor-not-allowed ${disabledBtn}`
              : "bg-[#6366f1] hover:bg-[#7577f3] text-white"
          }`}
        >
          {loading ? (
            <>
              <FiLoader className="anim-spin text-sm" /> Running...
            </>
          ) : (
            <>
              <FiPlay className="text-sm fill-current" /> Run Flow
            </>
          )}
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className={`!w-2.5 !h-2.5 !bg-[#6366f1] !border-2 ${isDark ? "!border-[#161a22]" : "!border-white"}`}
      />
    </div>
  );
}
