import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";

export default function AdminHeader({ toggleSidebar, sidebarOpen }) {
    return (
        <header className="bg-gray-800 px-5 py-2 border-b border-gray-700 flex lg:hidden justify-between items-center">
            <div className="bg-white rounded-full p-1">
                <Image
                    src={"/logo.png"}
                    alt="Zayars Energy logo"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                />
            </div>
            <div className="flex gap-5">
                <button
                    onClick={toggleSidebar}
                    className="border border-white p-3 rounded-full text-white hover:text-blue-950 hover:bg-white cursor-pointer"
                >
                    {sidebarOpen ? (
                        <XIcon size={20} strokeWidth={2} />
                        ) : (
                            <MenuIcon size={20} strokeWidth={1} />
                        )}
                </button>
            </div>
        </header>
    );
}
