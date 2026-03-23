import {
  FiZap,
  FiZoomOut,
  FiMaximize,
  FiZoomIn,
  FiLock,
  FiUnlock,
  FiSun,
  FiSave,
  FiRefreshCcw,
} from "react-icons/fi";

export default function Navbar({
  isDark,
  setTheme,
  isLocked,
  setIsLocked,
  zoomOut,
  zoomIn,
  fitView,
  saveStatus,
  handleSave,
  handleReset,
}) {
  const navBg = isDark
    ? "bg-[rgba(17,19,24,0.92)]"
    : "bg-[rgba(255,255,255,0.85)]";
  const navBorder = isDark ? "border-[#252b38]" : "border-[#e2e5ea]";
  const toolbarBg = isDark
    ? "bg-[#161a22] border-[#252b38]"
    : "bg-[#f7f8fa] border-[#e2e5ea]";
  const sepColor = isDark ? "bg-[#252b38]" : "bg-[#e2e5ea]";
  const textPrimary = isDark ? "text-[#eef0f4]" : "text-[#0d0f12]";
  const textSecond = isDark ? "text-[#8b95a8]" : "text-[#5a606b]";
  const textMuted = isDark ? "text-[#4d5668]" : "text-[#9ba3ae]";

  const statusCfg = {
    saving: {
      label: "Saving...",
      cls: isDark
        ? "text-[#4d5668] bg-[#161a22] border-[#252b38]"
        : "text-[#9ba3ae] bg-[#f7f8fa] border-[#e2e5ea]",
    },
    saved: {
      label: "Saved ✓",
      cls: isDark
        ? "text-[#22c55e] bg-[#052e16] border-[#166534]"
        : "text-[#16a34a] bg-[#f0fdf4] border-[#bbf7d0]",
    },
    nothing: {
      label: "Nothing to save",
      cls: isDark
        ? "text-[#4d5668] bg-[#161a22] border-[#252b38]"
        : "text-[#9ba3ae] bg-[#f7f8fa] border-[#e2e5ea]",
    },
    error: {
      label: "Save failed",
      cls: "text-red-400 bg-red-950 border-red-800",
    },
  };

  const ToolBtn = ({ onClick, title, active, children }) => {
    const base =
      "w-[30px] h-[30px] rounded-[7px] flex items-center justify-center transition-all duration-150 shrink-0 border-none cursor-pointer";
    const activeStyle = "bg-[#6366f1] text-white";
    const idleStyle = isDark
      ? "text-[#8b95a8] hover:bg-[#222738] hover:text-[#eef0f4]"
      : "text-[#5a606b] hover:bg-[#e8eaed] hover:text-[#0d0f12]";
    return (
      <button
        onClick={onClick}
        title={title}
        className={`${base} ${active ? activeStyle : idleStyle}`}
      >
        {children}
      </button>
    );
  };

  return (
    <header
      className={`h-[52px] shrink-0 z-50 relative flex items-center justify-between gap-3 px-4 ${navBg} ${navBorder} border-b backdrop-blur-md`}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-7 h-7 rounded-lg bg-[#6366f1] flex items-center justify-center shrink-0 ${isDark ? "shadow-[0_0_0_1px_rgba(99,102,241,0.35)]" : "shadow-[0_1px_4px_rgba(91,94,244,0.25)]"}`}
        >
          <FiZap className="text-white text-sm" />
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-[13px] font-bold tracking-tight ${textPrimary}`}
          >
            FutureBlink
          </span>
          <span className={`text-sm ${textMuted}`}>/</span>
          <span className={`text-[13px] font-medium ${textSecond}`}>
            Task Flow
          </span>
        </div>
        <div
          className={`hidden sm:flex items-center gap-[5px] px-2 py-0.5 rounded-full text-[11px] font-semibold ${isDark ? "text-[#22c55e] bg-[#052e16] border border-[#166534]" : "text-[#16a34a] bg-[#f0fdf4] border border-[#bbf7d0]"}`}
        >
          <span
            className={`w-[5px] h-[5px] rounded-full inline-block anim-pulse ${isDark ? "bg-[#22c55e]" : "bg-[#16a34a]"}`}
          />
          Live
        </div>
      </div>

      {/* Toolbar */}
      <div
        className={`flex items-center gap-0.5 p-[3px] rounded-[10px] border ${toolbarBg}`}
      >
        <ToolBtn onClick={() => zoomOut({ duration: 200 })} title="Zoom Out">
          <FiZoomOut />
        </ToolBtn>
        <ToolBtn
          onClick={() => fitView({ duration: 300, padding: 0.2 })}
          title="Fit View"
        >
          <FiMaximize />
        </ToolBtn>
        <ToolBtn onClick={() => zoomIn({ duration: 200 })} title="Zoom In">
          <FiZoomIn />
        </ToolBtn>
        <div className={`w-px h-[18px] mx-0.5 ${sepColor}`} />
        <ToolBtn
          onClick={() => setIsLocked(!isLocked)}
          title={isLocked ? "Unlock" : "Lock canvas"}
          active={isLocked}
        >
          {isLocked ? <FiLock /> : <FiUnlock />}
        </ToolBtn>
        <div className={`w-px h-[18px] mx-0.5 ${sepColor}`} />
        <ToolBtn
          onClick={() => setTheme(isDark ? "light" : "dark")}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </ToolBtn>
      </div>

      {/* Status + Save */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleReset}
          title="Reset Nodes"
          className={`flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-[12px] font-semibold transition-colors duration-150 tracking-[0.01em] shrink-0 border border-transparent ${isDark ? 'text-[#8b95a8] hover:text-[#eef0f4] hover:bg-[#222738]' : 'text-[#5a606b] hover:text-[#0d0f12] hover:bg-[#e8eaed]'}`}
        >
          <FiRefreshCcw className="text-[13px]" />
          Reset
        </button>
        {saveStatus && (
          <span
            className={`text-[11px] font-semibold px-2 py-[3px] rounded-md border transition-all ${statusCfg[saveStatus].cls}`}
          >
            {statusCfg[saveStatus].label}
          </span>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-[12px] font-semibold text-white bg-[#6366f1] hover:bg-[#7577f3] transition-colors duration-150 tracking-[0.01em] shrink-0 border-none cursor-pointer"
        >
          <FiSave className="text-[13px]" />
          Save Chat
        </button>
      </div>
    </header>
  );
}
