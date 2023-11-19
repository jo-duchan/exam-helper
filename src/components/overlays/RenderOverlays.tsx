import ReactDOM from "react-dom";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import Progress from "components/overlays/Progress";
import Toast from "components/overlays/Toast";

function RenderOverlays() {
  const portalElement = document.getElementById("overlays") as HTMLElement;
  const toastList = useSelector((state: RootState) => state.toast.list);

  return (
    <>
      {ReactDOM.createPortal(<Progress />, portalElement)}
      {ReactDOM.createPortal(
        toastList.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            sort={toast.sort}
          />
        )),
        portalElement
      )}
    </>
  );
}

export default RenderOverlays;
