import React, { createContext, useState, useCallback, useMemo } from "react";
import { nanoid } from "nanoid";
import {
  OverlayContextType,
  OverlayItem,
  OverlayElement,
  OverlayType,
} from "types/overlay";
import RenderOverlay from "components/overlays/RenderOverlay";
import Progress from "components/overlays/Progress";

interface Props {
  children: React.ReactNode;
}

export const OverlayAction = createContext<OverlayContextType | undefined>(
  undefined
);

const speed = 300;

function OverlayContext({ children }: Props) {
  const [overlayList, setOverlayList] = useState<OverlayItem[]>([]);

  const handleAddItem = useCallback(
    (element: OverlayElement, type: OverlayType) => {
      const id = nanoid();

      setOverlayList((prev: OverlayItem[]) => [
        ...prev,
        { id, element, type, display: "ON", speed },
      ]);

      return id;
    },
    []
  );

  const handleRemoveItem = useCallback(
    (targetId: string, type?: OverlayType) => {
      const remove = () => {
        setOverlayList((prev: OverlayItem[]) =>
          prev.filter(({ id }: OverlayItem) => id !== targetId)
        );
      };

      setOverlayList((prev: OverlayItem[]) =>
        prev.map((prev) =>
          prev.id === targetId ? { ...prev, display: "OFF" } : prev
        )
      );

      setTimeout(() => remove(), speed);
    },
    []
  );

  const handleRemoveProgress = useCallback(() => {
    const remove = () => {
      setOverlayList((prev: OverlayItem[]) =>
        prev.filter(({ type }: OverlayItem) => type !== "PROGRESS")
      );
    };

    setOverlayList((prev: OverlayItem[]) =>
      prev.map((prev) =>
        prev.type === "PROGRESS" ? { ...prev, display: "OFF" } : prev
      )
    );

    setTimeout(() => remove(), speed);
  }, []);

  const action = useMemo(() => {
    return {
      handleShow: (element: OverlayElement, type: OverlayType) =>
        handleAddItem(element, type),
      handleHide: (id: string, type?: OverlayType) =>
        handleRemoveItem(id, type),
      showProgress: () => handleAddItem(<Progress />, "PROGRESS"),
      hideProgress: () => handleRemoveProgress(),
      showToast: (message: string) =>
        handleAddItem(<div>{message}</div>, "TOAST"),
    };
  }, [handleAddItem, handleRemoveItem]);

  return (
    <OverlayAction.Provider value={action}>
      <RenderOverlay items={overlayList} />
      {children}
    </OverlayAction.Provider>
  );
}

export default OverlayContext;
