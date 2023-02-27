import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { useRecoilState } from "recoil";
import { modalState } from "@/recoil/modalAtom";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";

const PerfumeModal = ({ productId }) => {
  const [product, setProduct] = useState({});
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    async function getProduct() {
      const docSnap = await getDoc(doc(db, "perfumes", productId));
      setProduct(docSnap.data());
      setPrice(product.price);
    }
    getProduct();
  }, []);

  const handleClose = (e) => {
    if (
      e.target.className ===
      "h-screen fixed top-0 left-0 w-full flex flex-col items-center justify-center bg-black bg-opacity-50"
    ) {
      setOpenModal(false);
    }
  };

  async function handleBuy() {
    await addDoc(collection(db, "orders"), {
      uid: user.uid,
      productName: product.name,
      productPrice: product.price,
      quantity: 1,
      timestamp: serverTimestamp(),
    });
    setOpenModal({ isOpen: false, productId: "" });
  }

  return (
    <>
      <main
        onClick={handleClose}
        className="h-screen fixed top-0 left-0 w-full flex flex-col items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-2 rounded-lg">
          <div>
            <img src={product.image} alt="" className="w-[300px] rounded-lg" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="mt-2 font-semibold">{product.name}</span>
            <span>Price: ₹ {product.price}</span>
            <div className="flex items-center space-x-5">
              <span>Quantity: &nbsp;{quantity} </span>
            </div>
            <button className="bg-red-300 p-1 rounded-md" onClick={handleBuy}>
              Buy Now
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default PerfumeModal;
