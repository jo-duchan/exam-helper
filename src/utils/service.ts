import { json } from "react-router-dom";
import { ref, child, get, set, push, update } from "firebase/database";
import { db } from "firebase-config";
import { showProgress, hideProgress } from "utils/progress";

const service = {
  GET: async <T>(path: string): Promise<T> => {
    try {
      showProgress();
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        hideProgress();
        return snapshot.val();
      } else {
        hideProgress();
        throw json({ message: "데이터를 불러오지 못했어요." }, { status: 500 });
      }
    } catch {
      hideProgress();
      throw json({ message: "데이터를 불러오지 못했어요." }, { status: 500 });
    }
  },

  SET: async <T>(path: string, data: T) => {
    try {
      showProgress();
      await set(ref(db, path), data);
    } catch {
      hideProgress();
      throw json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    }
  },

  PUSH: async <T>(path: string, data: T) => {
    const listRef = ref(db, path);
    const newListRef = push(listRef);

    try {
      showProgress();
      await set(newListRef, data);
      return newListRef.key;
    } catch {
      hideProgress();
      throw json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    }
  },

  UPDATE: async <T>(path: string, data: T) => {
    try {
      showProgress();
      await update(ref(db, path), data as Object);
    } catch {
      hideProgress();
      throw json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    }
  },
};

export default service;
