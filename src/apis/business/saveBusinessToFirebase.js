import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { showErrorToast, showSuccessToast, showWarningToast } from "../../utils/showToast";

const saveBusinessToFirebase = async (id, data) => {
  const docRef = doc(db, "business", id);
  try {
    // Check if the document exists
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // Document exists, update it
      await updateDoc(docRef, data);
      showSuccessToast("Your Data Successfully Update")
    } else {
      showErrorToast("Document does not exist");
    }
  } catch (error) {
    showWarningToast("Error updating document:", error);
  }
};

export default saveBusinessToFirebase;
