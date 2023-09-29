import React, { ReactNode } from "react";
import { Await } from "react-router-dom";
import styled from "styled-components";
import useOverlay from "hook/useOverlay";

interface Props<T> {
  children: React.ReactNode;
  resolve: T;
}

function LoaderProgress<T>({ children, resolve }: Props<T>) {
  const { showProgress, hideProgress } = useOverlay();
  const setProgress = (val: boolean) => {
    if (val) {
      showProgress();
      console.log("show");
    }

    if (!val) {
      hideProgress();
      console.log("hide");
    }
    return <></>;
  };
  return (
    <>
      {children}
      <React.Suspense fallback={setProgress(true)}>
        <Await resolve={resolve}>
          {(resolve) => (resolve ? setProgress(false) : <></>)}
        </Await>
      </React.Suspense>
    </>
  );
}

export default LoaderProgress;
