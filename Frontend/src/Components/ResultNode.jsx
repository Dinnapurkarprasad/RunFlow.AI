import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { FiMessageSquare, FiCopy, FiCheck, FiLoader } from "react-icons/fi";

export default function ResultNode({ data }) {
  const result = data?.result;
  const isDark = data?.theme === "dark";
  const isLoading = result === "Loading...";
  const hasResult = result && !isLoading;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!hasResult) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  //custom css for dark and light bg
  const nodeBg = isDark ? "bg-[#161a22]" : "bg-white";
  const nodeBorder = isDark ? "border-[#252b38]" : "border-[#e2e5ea]";
  const nodeShadow = isDark
    ? "shadow-[0_1px_3px_rgba(0,0,0,0.4),0_4px_24px_rgba(0,0,0,0.4)]"
    : "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]";
  const headerBg = isDark ? "bg-[#1c2130]" : "bg-[#f7f8fa]";
  const headerBdr = isDark ? "border-[#252b38]" : "border-[#e2e5ea]";
  const nodeTitle = isDark ? "text-[#8b95a8]" : "text-[#5a606b]";
  const footerBdr = isDark ? "border-[#252b38]" : "border-[#e2e5ea]";
  const mutedText = isDark ? "text-[#4d5668]" : "text-[#9ba3ae]";
  const bodyText = isDark ? "text-[#8b95a8]" : "text-[#5a606b]";
  const emptyIcon = isDark ? "text-[#2e3547]" : "text-[#cdd0d6]";
  const copyHover = isDark
    ? "hover:bg-[#222738] hover:text-[#eef0f4]"
    : "hover:bg-[#e8eaed] hover:text-[#0d0f12]";
  const copyBase = isDark ? "text-[#4d5668]" : "text-[#9ba3ae]";

  const statusColor = isLoading
    ? "text-amber-400"
    : hasResult
      ? isDark
        ? "text-[#22c55e]"
        : "text-[#16a34a]"
      : mutedText;
  const dotColor = isLoading
    ? "bg-amber-400 anim-pulse"
    : hasResult
      ? isDark
        ? "bg-[#22c55e]"
        : "bg-[#16a34a]"
      : isDark
        ? "bg-[#2e3547]"
        : "bg-[#cdd0d6]";
  const statusLabel = isLoading ? "Running" : hasResult ? "Done" : "Idle";

  return (
    <div
      className={`w-[380px] h-[420px] rounded-xl overflow-hidden border flex flex-col ${nodeBg} ${nodeBorder} ${nodeShadow}`}
    >
      <div
        className={`flex items-center gap-2 px-3 py-[9px] border-b shrink-0 ${headerBg} ${headerBdr}`}
      >
        <div className="w-[22px] h-[22px] rounded-md bg-[#16a34a] flex items-center justify-center shrink-0">
          <FiMessageSquare className="text-white text-xs" />
        </div>
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.06em] ${nodeTitle}`}
        >
          Result Node
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div
            className={`flex items-center gap-[5px] text-[11px] font-semibold ${statusColor}`}
          >
            <span
              className={`w-[6px] h-[6px] rounded-full inline-block ${dotColor}`}
            />
            {statusLabel}
          </div>
          <button
            onClick={handleCopy}
            disabled={!hasResult}
            title="Copy response"
            className={`w-6 h-6 rounded-[5px] flex items-center justify-center transition-colors duration-150 border-none ${hasResult ? `cursor-pointer ${copyBase} ${copyHover}` : "cursor-not-allowed opacity-30 text-[#4d5668]"} ${copied ? (isDark ? "text-[#22c55e]" : "text-[#16a34a]") : ""}`}
          >
            {copied ? (
              <FiCheck className="text-sm" />
            ) : (
              <FiCopy className="text-sm" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 p-3 flex flex-col">
        {!result ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 m-auto">
            <FiMessageSquare className={`text-3xl ${emptyIcon}`} />
            <span className={`text-[12px] ${mutedText}`}>
              Awaiting response...
            </span>
          </div>
        ) : isLoading ? (
          <div className="h-full flex items-center justify-center gap-2 m-auto">
            <FiLoader className="anim-spin text-[#6366f1] text-lg" />
            <span className={`text-[13px] ${bodyText}`}>
              Generating response...
            </span>
          </div>
        ) : (
          <p
            className={`text-[13px] leading-[1.7] whitespace-pre-wrap m-0 ${bodyText}`}
          >
            {result}
          </p>
        )}
      </div>

      {hasResult && (
        <div
          className={`shrink-0 px-3 py-[5px] border-t flex items-center justify-between ${footerBdr}`}
        >
          <span className={`text-[10px] ${mutedText}`}>
            {result.split(/\s+/).filter(Boolean).length} words
          </span>
          <span className={`text-[10px] ${mutedText}`}>
            {result.split("\n").filter(Boolean).length} lines
          </span>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className={`!w-2.5 !h-2.5 !bg-[#16a34a] !border-2 ${isDark ? "!border-[#161a22]" : "!border-white"}`}
      />
    </div>
  );
}
