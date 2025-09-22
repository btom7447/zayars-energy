import { LogOutIcon, PlusIcon } from "lucide-react";

export default function AdminHeader() {
    return (
        <header className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
            <h1 className="text-white text-3xl font-light text-center">Blog Dashboard</h1>
            <div className="flex gap-5">
                <button
                    onClick={() => alert("Add logout logic")}
                    className="border-1 border-white p-3 rounded-full text-white hover:text-blue-950 hover:bg-white cursor-pointer"
                >
                    <LogOutIcon size={20} strokeWidth={1} />
                </button>
                
            </div>
        </header>
    );
}
