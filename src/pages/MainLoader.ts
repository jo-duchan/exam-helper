import { redirect, json } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";

export default async function MainLoader() {
  const userKey = localStorage.getItem("userKey");
  if (!userKey) {
    return redirect("/signin");
  }

  const dbRef = ref(db);
  const data = await get(child(dbRef, `users/${userKey}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  return data;
}
