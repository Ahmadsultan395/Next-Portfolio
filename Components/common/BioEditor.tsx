"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Froala CSS - must be before dynamic import
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/colors.min.css"; // ← colors plugin CSS

// Dynamic import for Next.js SSR
const FroalaEditor = dynamic(
  async () => {
    const editor = await import("react-froala-wysiwyg");

    // ── Explicitly load required plugins ──────────────
    await import("froala-editor/js/plugins/colors.min.js");
    await import("froala-editor/js/plugins/link.min.js");
    await import("froala-editor/js/plugins/lists.min.js");

    return editor;
  },
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 300,
          background: "#1a1a20",
          border: "1.5px solid #22222b",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
        }}
      >
        Loading editor...
      </div>
    ),
  },
);

interface FroalaBioEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function FroalaBioEditor({
  value,
  onChange,
  placeholder = "Write your bio here...",
  maxLength,
}: FroalaBioEditorProps) {
  const [content, setContent] = useState(value);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleModelChange = (model: string) => {
    if (maxLength && model.replace(/<[^>]*>/g, "").length > maxLength) return;
    setContent(model);
    onChange(model);
  };

  return (
    <>
      <style>{`
        /* ── Outer wrapper ────────────────────────────── */
        .fr-box.fr-basic .fr-wrapper,
        .fr-box.fr-basic.fr-top .fr-wrapper {
          background: #1a1a20 !important;
          border: 1.5px solid #22222b !important;
          border-top: none !important;
          border-radius: 0 0 6px 6px !important;
        }

        /* ── Toolbar ──────────────────────────────────── */
        .fr-toolbar {
          background: #1a1a20 !important;
          border: 1.5px solid #22222b !important;
          border-bottom: 1px solid #22222b !important;
          border-radius: 6px 6px 0 0 !important;
        }
        .fr-toolbar .fr-btn {
          color: #fff !important;
        }
        .fr-toolbar .fr-btn:hover,
        .fr-toolbar .fr-btn.fr-active {
          background: #2a2a34 !important;
          color: #fff !important;
        }

        /* ── Editable area ────────────────────────────── */
        .fr-element {
          background: #1a1a20 !important;
          color: #fff !important;
          min-height: 260px !important;
          padding: 14px 16px !important;
          font-size: 14px !important;
        }

        /* ── Placeholder ──────────────────────────────── */
        .fr-placeholder {
          color: #666 !important;
        }

        /* ── Color picker popup ───────────────────────── */
        .fr-popup {
          background: #1a1a20 !important;
          border: 1px solid #33333d !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
        }
        .fr-popup .fr-action-buttons button {
          color: #fff !important;
          background: #2a2a34 !important;
        }

        /* ── Color tabs (Text / Background) ──────────── */
        .fr-popup .fr-tabs {
          background: #13131a !important;
          border-bottom: 1px solid #33333d !important;
        }
        .fr-popup .fr-tabs .fr-command {
          color: #aaa !important;
          background: transparent !important;
          padding: 8px 14px !important;
        }
        .fr-popup .fr-tabs .fr-command:hover {
          color: #fff !important;
          background: #2a2a34 !important;
        }
        .fr-popup .fr-tabs .fr-command.fr-active,
        .fr-popup .fr-tabs .fr-command[aria-selected="true"] {
          color: #fff !important;
          border-bottom: 2px solid #7c6af7 !important;
          background: transparent !important;
        }

        /* ── Color swatches area ──────────────────────── */
        .fr-popup .fr-color-set {
          background: #1a1a20 !important;
          padding: 8px !important;
        }
        .fr-popup .fr-color-set .fr-select-color {
          border: 2px solid transparent !important;
          border-radius: 3px !important;
        }
        .fr-popup .fr-color-set .fr-select-color:hover {
          border-color: #fff !important;
        }

        /* ── Input field inside popup (hex input) ─────── */
        .fr-popup input[type="text"] {
          background: #13131a !important;
          color: #fff !important;
          border: 1px solid #33333d !important;
          border-radius: 4px !important;
          padding: 4px 8px !important;
        }

        /* ── Bottom toolbar ───────────────────────────── */
        .fr-second-toolbar {
          background: #1a1a20 !important;
          border: 1.5px solid #22222b !important;
          border-top: 1px solid #33333d !important;
          border-radius: 0 0 6px 6px !important;
          color: #666 !important;
        }

        /* ── Focus state ──────────────────────────────── */
        .fr-box.fr-basic:focus-within .fr-wrapper,
        .fr-box.fr-basic:focus-within .fr-toolbar {
          border-color: #3a3a50 !important;
        }
      `}</style>

      <div style={{ borderRadius: 6, overflow: "hidden" }}>
        <FroalaEditor
          model={content}
          onModelChange={handleModelChange}
          config={{
            placeholderText: placeholder,
            height: 300,

            // ── Plugins to activate ────────────────────
            pluginsEnabled: ["colors", "link", "lists"],

            // ── Toolbar buttons ────────────────────────
            toolbarButtons: {
              moreText: {
                buttons: [
                  "bold",
                  "italic",
                  "underline",
                  "strikeThrough",
                  "textColor",
                  "backgroundColor",
                ],
                align: "left",
                buttonsVisible: 6,
              },
              moreParagraph: {
                buttons: ["formatOL", "formatUL"],
                align: "left",
                buttonsVisible: 2,
              },
              moreRich: {
                buttons: ["insertLink"],
                align: "left",
                buttonsVisible: 1,
              },
            },

            // ── Color options ──────────────────────────
            colorsDefaultTab: "text",
            colorsText: [
              "#FFFFFF",
              "#CCCCCC",
              "#999999",
              "#666666",
              "#333333",
              "#FF4444",
              "#FF8800",
              "#FFDD00",
              "#44CC44",
              "#4488FF",
              "#AA44FF",
              "#FF44AA",
            ],
            colorsBackground: [
              "#FFFFFF",
              "#CCCCCC",
              "#999999",
              "#666666",
              "#000000",
              "#FFEB3B",
              "#FF5722",
              "#4CAF50",
              "#2196F3",
              "#9C27B0",
            ],
            colorsStep: 6,
            colorsHEXInput: true,

            // ── Misc ───────────────────────────────────
            attribution: false,
            charCounterCount: !!maxLength,
            charCounterMax: maxLength ?? -1,
            useClasses: false,
          }}
        />
      </div>
    </>
  );
}
