import { useContext } from "react";
import { OverlayAction } from "contexts/OverlayContext";

function useOverlay() {
  const value = useContext(OverlayAction);

  if (value === undefined) {
    throw new Error("useOverlay should be used within OverlaysProvider");
  }
  return value;
}

export default useOverlay;
