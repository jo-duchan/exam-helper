import { json } from "react-router-dom";
import { ref, child, get, set, push } from "firebase/database";
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
  return { GET };
}

export default service;
