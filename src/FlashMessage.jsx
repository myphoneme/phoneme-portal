// import FlashMessage from "./FlashMessage";
import { useState } from "react";

const FlashMessage = () => {
  const [flash, setFlash] = useState({ message: "", type: "" });

  const handleSubmit = async () => {
    try {
      // Perform CRUD operation here
      setFlash({ message: "Data saved successfully!", type: "success" });
    } catch (error) {
      setFlash({ message: "An error occurred!", type: "error" });
    }
  };

  return (
    <div >
      {flash.message && <FlashMessage message={flash.message} type={flash.type} onClose={() => setFlash({ message: "", type: "" })} />}
      <button onClick={handleSubmit} className="bg-success">Submit</button>
    </div>
  );
};

export default FlashMessage;
