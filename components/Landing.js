import { db } from "@/firebase";
import { modalState } from "@/recoil/modalAtom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Carousel from "./Carousel";
import PerfumeModal from "./PerfumeModal";
import ProductCard from "./ProductCard";

const Landing = () => {
  const demoImages = [
    "https://images.unsplash.com/photo-1543857261-f71238eb4188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHBlcmZ1bWV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1605648511528-fa48bdb09d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBlcmZ1bWV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1543422018-9a1c40cf955d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcmZ1bWV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  ];

  const [loading, setLoading] = useState(false);
  const [perfumes, setPerfumes] = useState([]);
  const { isOpen, productId } = useRecoilValue(modalState);
  const [openModal, setOpenModal] = useRecoilState(modalState);

  // ? GET PRODUCTS FROM FIRESTORE DATABASE

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "perfumes"), orderBy("auras", "desc")),
      (snapshot) => {
        setPerfumes(snapshot.docs);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [db]);

  return (
    <>
      <Carousel images={demoImages} />
      <span className="font-lg pl-3 text-2xl sm:text-3xl">
        Exclusive from Scentique
      </span>
      <main className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-4">
          {perfumes.slice(0, 4)?.map((perfume) => (
            <div
              key={perfume.id}
              onClick={() => {
                setOpenModal({ isOpen: true, productId: perfume.id });
              }}
            >
              <ProductCard
                img={perfume.data().image}
                name={perfume.data().name}
                price={perfume.data().price}
                auras={perfume.data().auras}
                quantity={perfume.data().quantity}
              />
            </div>
          ))}
        </div>
      </main>
      {isOpen && <PerfumeModal productId={productId} />}
    </>
  );
};

export default Landing;
