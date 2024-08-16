import About from "@/components/About";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import Products from "@/components/Products";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { siteContentModel } from "@/models/siteContent.model";

async function getData(): Promise<siteContentModel> {
  const contentRef = doc(collection(db, "site_content"), "1");
  const contentDoc = await getDoc(contentRef);

  let siteContent = {} as siteContentModel;

  if (contentDoc.exists()) {
    siteContent = {
      description: contentDoc.data().description || "",
      logo: contentDoc.data().logo || "",
      email: contentDoc.data().email1 || "",
      contact_number1: contentDoc.data().contact_number1 || "",
      contact_number2: contentDoc.data().contact_number2 || "",
      location: contentDoc.data().location || "",
    };
  }

  return siteContent;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-7 overflow-hidden ">
      <div className="flex justify-center w-full ">
        <NavBar />
      </div>
      <About data={data} />

      <div className="w-full">
        <Products />
      </div>
      <div className=" w-full">
        <Footer data={data} />
      </div>
    </main>
  );
}
