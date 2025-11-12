// src/components/IngredientPickerModal.jsx
import { useMemo, useRef } from "react";

export default function IngredientPicker({ open, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  // keep this list small and friendly; extend anytime
  const INGREDIENTS = useMemo(
    () => [
      "chicken", "beef", "salmon", "egg", "pasta", "rice", "potato",
      "spinach", "avocado", "tomato", "onion", "garlic", "lemon", "chocolate",
    ],
    []
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 96vw)",
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 20px 55px rgba(0,0,0,.25)",
        }}
      >
        <h3 style={{ margin: 0 }}>Pick a few ingredients</h3>
        <p style={{ marginTop: 8, color: "#555" }}>
          We’ll recommend recipes that use them.
        </p>

        {/* chips */}
        <div
          id="ingredient-chips"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            margin: "18px 0 6px",
          }}
        >
          {INGREDIENTS.map((ing) => (
            <button
              key={ing}
              type="button"
              data-name={ing}
              data-active="0"
              onMouseDown={(e) => {
                // toggle visual + state without React noise
                const btn = e.currentTarget;
                const active = btn.getAttribute("data-active") === "1";
                btn.setAttribute("data-active", active ? "0" : "1");
                btn.style.background = active ? "#fafafa" : "#ffe8de";
                btn.style.borderColor = active ? "#ddd" : "#ff7f50";
              }}
              style={{
                border: "1px solid #ddd",
                padding: "8px 12px",
                borderRadius: 999,
                cursor: "pointer",
                background: "#fafafa",
                transition: "all .15s ease",
                userSelect: "none",
              }}
            >
              {ing}
            </button>
          ))}
        </div>

        {/* actions */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 14,
          }}
        >
          <button type="button" onClick={onClose} style={{ padding: "10px 14px" }}>
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              const chosen = Array.from(
                document.querySelectorAll('#ingredient-chips [data-active="1"]')
              ).map((el) => el.getAttribute("data-name"));
              onConfirm(chosen);
            }}
            style={{
              padding: "10px 14px",
              background: "#ff7f50",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Show Recipes
          </button>
        </div>
      </div>
    </div>
  );
}
