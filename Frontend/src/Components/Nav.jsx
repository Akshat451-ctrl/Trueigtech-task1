import { Send } from "lucide-react";
import Cookies from "js-cookie";

export default function Nav() {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 mb-6">
                <div className="w-100 flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-3 d-block">Insta.</h2>
                    <div className="flex">
                    <ul className="flex items-center gap-6">
                        <a href="/dashboard" className="text-gray-200 hover:text-pink-400"><li className="mt-[-8px] ms-4 cursor-pointer">Home</li></a>
                        <a href="/explore" className="hover:text-pink-400"><li className="mt-[-8px] ms-4 cursor-pointer">Explore People</li></a>
                        <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-full flex items-center gap-2" onClick={()=>{
                            Cookies.remove("token");
                            Cookies.remove("userId");
                            window.location.href = "/";
                        }}>
                         Logout
                        </button>
                    </ul>
                    </div>
                </div>
            
     </div>
  );
}