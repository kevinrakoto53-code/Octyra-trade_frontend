import Image from "next/image";
import { Send } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="grid font-lora grid-cols-2 px-10  md:grid-cols-4 gap-6 text-sm bg-linear-to-br from-gray-700 to-orange-900 md:px-28 md:justify-center md:items-center pb-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center ">
          <Image
            src="/avatar-octyra.png"
            alt="logo"
            width={50}
            height={50}
            style={{ width: "50px", height: "50px" }}
          />
          <h1 className="font-bold text-lg">OCTYRA </h1>
        </div>
        <div className="">
          <p>
            Intelligent trading powered by AI . Scan , analyze , and execute
          </p>
          <p className="flex gap-2 items-center">
            <span className="w-4 h-1 bg-white"/>
            faster than any human
          </p>
        </div>
        <div className="flex my-5">
          <Send width={30} height={30} />
          <FaGithub className="w-8 h-8" />
          <FaTwitter className="w-8 h-8" />
        </div>
      </div>
      <div>
        <h2 className="uppercase text-lg mt-3 font-semibold underline underline-offset-4">
          Product
        </h2>
        <p className=" tracking-wider p-1">Octyra AI</p>
        <p className=" tracking-wider p-1">Pricing</p>
        <p className=" tracking-wider p-1">Learn Trading</p>
        <p className=" tracking-wider p-1">Support</p>
      </div>
      <div>
        <h2 className="uppercase text-lg underline underline-offset-4 font-semibold mt-3">
          Company
        </h2>
        <p className=" tracking-wider p-1">About</p>
        <p className=" tracking-wider p-1">Blog</p>
        <p className=" tracking-wider p-1">Careers Contact</p>
        <p className=" tracking-wider p-1">Support</p>
      </div>
      <div>
        <h2 className="uppercase text-lg  underline underline-offset-4 font-semibold mt-3">
          Legal
        </h2>
        <p className=" tracking-wider py-1">Privacy Policy</p>
        <p className=" tracking-wider py-1">Terms of Service</p>
        <p className=" tracking-wider py-1">Risk Disciosure</p>
        <p className=" tracking-wider py-1">Cookie Policy</p>
      </div>
    </div>
  );
}
