import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Account = () => {
  const [details, setDetails] = useState(false);

  // ? fetching the user address

  const { user } = useAuth();
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "address"), where("uid", "==", user.uid)),
      (snapshot) => {
        setAddress(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db]);

  console.log(address);

  return (
    <>
      <main>
        <div>
          <span>Name</span>:&nbsp;&nbsp;{user.displayName}
        </div>
        <div>Email:&nbsp;&nbsp;{user.email}</div>
        {/* BELOW ARE THE DETAILS FOR ORDER PURPOSES */}
        {address.length > 0 && (
          <div>
            <div>Phone:&nbsp;&nbsp;{address[0].data().phone}</div>
            <div>Address:&nbsp;&nbsp;{address[0].data().address}</div>
          </div>
        )}
      </main>
    </>
  );
};

export default Account;
