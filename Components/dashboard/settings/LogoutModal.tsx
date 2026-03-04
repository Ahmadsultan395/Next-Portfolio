// LOGOUT CONFRIM
const LogoutModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <>
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.7)",
          backdropFilter: "blur(10px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: "36px 32px 28px",
            width: 340,
            maxWidth: "90vw",
            boxShadow: "0 40px 100px rgba(0,0,0,.6)",
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              margin: "0 auto 22px",
              background: "rgba(255,77,109,.1)",
              border: "2px solid rgba(255,77,109,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff4d6d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <h3
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: 18,
              margin: "0 0 8px",
              color: "var(--text-primary)",
            }}
          >
            Want to logout?
          </h3>
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "var(--text-secondary)",
              margin: "0 0 26px",
              lineHeight: 1.7,
            }}
          >
            Session will Be end and you lost the dashboard access until you
            login again.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: "11px 0",
                borderRadius: 12,
                border: "1.5px solid var(--border)",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1,
                padding: "11px 0",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(255,77,109,.4)",
              }}
            >
              yes, Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
