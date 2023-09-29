import { json } from "react-router-dom";
import { ref, child, get, set, push, update } from "firebase/database";
import { db } from "firebase-config";

function service() {
  const GET = async <T>(path: string): Promise<T> => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw json({ message: "데이터를 불러오지 못했어요." }, { status: 500 });
      }
    } catch {
      throw json({ message: "데이터를 불러오지 못했어요." }, { status: 500 });
    }
  };

  const SET = async <T>(path: string, data: T) => {
    try {
      await set(ref(db, path), data);
    } catch {
      json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    }
  };

  const PUSH = async <T>(path: string, data: T) => {
    const listRef = ref(db, path);
    const newListRef = push(listRef);

    try {
      await set(newListRef, data);
      return newListRef.key;
    } catch {
      json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    }
  };

  const UPDATE = async <T>(path: string, data: T) => {
    try {
      await update(ref(db, path), data as Object);
    } catch {
      json({ message: "데이터를 저장하지 못했어요." }, { status: 500 });
    }
  };

  return { GET, SET, PUSH, UPDATE };
}

export default service;
