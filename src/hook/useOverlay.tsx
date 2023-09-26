import { useContext } from "react";
import { OverlayAction } from "contexts/OverlayContext";

export function useOverlay() {
  const value = useContext(OverlayAction);

  if (value === undefined) {
    throw new Error("useOverlay should be used within OverlaysProvider");
  }
  return value;
}

export default useOverlay;
