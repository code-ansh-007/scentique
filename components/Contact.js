import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(db, "contactInfo"), {
      uid: user.uid,
      name,
      email,
      phone,
      message,
      timestamp: serverTimestamp(),
    });
    setLoading(false);
    setSuccess(true);
    clearInputs();
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }, [success]);

  return (
    <>
      <div className="flex flex-col mt-4 mb-5">
        <div className="flex flex-col items-center">
          <p className="text-center mt-[30px] mb-[10px] text-3xl font-light text-black">
            Contact Us
          </p>
          <span className="text-gray-800 text-center">
            Feel free to connect with us and <br /> share your feedback
          </span>
        </div>
        <form
          className="flex flex-grow justify-center items-center mt-[10px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-black mt-[15px] text-sm pb-1 "
            >
              Name
            </label>
            <input
              type="text"
              required={true}
              id="name"
              name="name"
              className="border-[1px] outline-none w-[300px] sm:w-[500px] h-10 rounded-md pl-2 bg-inherit border-black"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label
              htmlFor="email"
              className="text-black mt-[15px] text-sm pb-1 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required={true}
              name="email"
              className="border-[1px] outline-none w-[300px] sm:w-[500px] h-10 rounded-md pl-2 bg-inherit border-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label
              htmlFor="phone"
              className="text-black mt-[15px] text-sm pb-1 "
            >
              Phone No.
            </label>
            <input
              type="tel"
              name="phone"
              required={true}
              id="phone"
              className="border-[1px] outline-none w-[300px] sm:w-[500px] h-10 rounded-md pl-2 bg-inherit border-black"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <label
              htmlFor="message"
              className="text-black mt-[15px] text-sm pb-1 "
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              cols="30"
              rows="5"
              className="border-[1px] outline-none w-[300px] sm:w-[500px] text-black rounded-md pl-2 pt-1 bg-inherit border-black placeholder-gray-800"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Write your concerns here"
            ></textarea>
            <div className="flex space-x-3 items-center mt-[20px]">
              <button
                type="submit"
                className=" w-[80px] text-gray-300 outline-none py-1 rounded-md hover:scale-105 transition transform duration-150 ease-out bg-red-700"
              >
                Submit
              </button>
              {loading ? (
                <div className="flex items-center space-x-3">
                  <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
                  <span>Sending Feedback</span>
                </div>
              ) : (
                success && <div>Feedback Sent</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
