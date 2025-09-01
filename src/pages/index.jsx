// src/pages/index.jsx
import Link from 'next/link';


export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="max-w-xl w-full space-y-6 text-center">
                <h1 className="text-3xl font-bold">Welcome to School Directory</h1>
                <p className="text-gray-600">Find and manage schools in your area</p>
                <div className="flex gap-4 justify-center">
                    <Link href="/addSchool" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        Add New School
                    </Link>
                    <Link href="/showSchools" className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                        Browse Schools
                    </Link>
                </div>
            </div>
        </main>
    );
}