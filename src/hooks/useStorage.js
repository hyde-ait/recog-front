import { useState, useEffect } from "react";
import { projectStorage, db } from "../firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const delImg = (folder, imgName) => {
  const imgRef = ref(projectStorage, folder + "/" + imgName);
  // Delete the file
  deleteObject(imgRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error;
    });
};

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const storageRef = ref(projectStorage, "test/" + file.name); // N'OUBLIE PAS DE CHANGER TEST
    const collectionRef = collection(db, "images");
    const uploadTask = uploadBytesResumable(storageRef, file);
    const now = new Date(new Date().toISOString().slice(0, 10));
    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100; //pourcentage de l'upload
        setProgress(percentage);
        console.log("Uploaded a blob or file!");
      },
      (err) => {
        setError(err);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const fileName = file.name;
          const url = downloadURL; //L'URL du fichier
          const createdAt = Timestamp.fromDate(now);
          addDoc(collectionRef, { fileName, url, createdAt });
          setUrl(url);
          console.log("URL set");
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export { delImg };
export default useStorage;
