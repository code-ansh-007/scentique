import { db } from "@/firebase";
import { modalState } from "@/recoil/modalAtom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PerfumeModal from "./PerfumeModal";
import ProductCard from "./ProductCard";

const Products = () => {
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
      <main className="flex items-center flex-col justify-center">
        <span className=" text-xl my-5">Products from Scentique</span>
        <div className="grid grid-cols-1 sm:grid-cols-4">
          {perfumes?.map((perfume) => (
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

export default Products;
