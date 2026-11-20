import { useEffect, useState } from "react";

export function HospitalPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let loadedTimer: number | undefined;
    const finish = () => {
      loadedTimer = window.setTimeout(() => setVisible(false), 220);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    const fallbackTimer = window.setTimeout(() => setVisible(false), 1300);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(loadedTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="hospital-preloader" role="status">
      <img
        src="/care-speciality-hospital-logo.png"
        alt=""
        width={104}
        height={104}
        fetchPriority="high"
      />
      <span className="sr-only">Loading Care Speciality Hospital</span>
    </div>
  );
}
