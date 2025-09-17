import Image from "next/image";
import { Poppins } from "next/font/google";
import HospitalImage from "../../../../public/assets/images/hospital_image.jpeg";
import Password from "@/app/_components/password";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function Register() {
  return (
    <div className="bg-[#13294b] h-screen bg-left-top flex">
      <div className="w-full flex flex-col h-full  justify-center items-center">
        <div className="w-10/12">
          <div
            className={`text-2xl ${poppins.className} text-white text-center`}
          >
            Create an account
          </div>
          <div
            className={`text-sm ${poppins.className} text-gray-300 text-center`}
          >
            Welcome to HeathSOS
          </div>
          <div className="h-8"></div>
          <div className="flex-col flex">
            <div className="flex-col flex">
              <label htmlFor="full_name" className="text-sm text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                className="bg-white rounded-3xl h-10 outline-none px-2"
              />
            </div>
            <div className="flex-col flex mt-4">
              <label htmlFor="email" className="text-sm text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white rounded-3xl h-10 outline-none px-2"
              />
            </div>
            <div className="flex-col flex mt-4">
              <label htmlFor="full_name" className="text-sm text-white mb-2">
                Password
              </label>
              <Password />
            </div>
            <div className="flex items-center justify-center mt-8 py-4 rounded-3xl hover:bg-amber-300 transition-all hover:text-amber-600 bg-amber-600 text-white">
              <button>Register Now</button>
            </div>
            <div className="text-white text-center mt-4">
              Already have an account?{" "}
              <Link href={"/auth/login"} className="underline text-blue-300">
                Login!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full justify-center items-center flex pr-8">
        <div className="w-full h-3/4 ">
          <Image
            src={HospitalImage}
            alt={""}
            className="h-full w-full rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
}
