import { json } from "react-router-dom";
import { ref, child, get, set, push, update } from "firebase/database";
import { db } from "firebase-config";
import { showProgress, hideProgress } from "utils/overlays";

const service = {
  GET: async <T>(path: string): Promise<T> => {
    try {
      showProgress();
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw json({ message: "데이터를 불러오지 못했어요." }, { status: 500 });
      }
    } catch {
      throw json({ message: "데이터를 불러오지 못했어요." }, { status: 500 });
    } finally {
      hideProgress();
    }
  },

  SET: async <T>(path: string, data: T) => {
    try {
      showProgress();
      await set(ref(db, path), data);
    } catch {
      throw json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    } finally {
      hideProgress();
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
      throw json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    } finally {
      hideProgress();
    }
  },

  UPDATE: async <T>(path: string, data: T) => {
    try {
      showProgress();
      await update(ref(db, path), data as Object);
    } catch {
      throw json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    } finally {
      hideProgress();
    }
  },
};

export default service;
