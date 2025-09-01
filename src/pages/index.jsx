// src/pages/index.jsx
import Link from 'next/link';


export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="max-w-xl w-full space-y-6 text-center">
                <h1 className="text-3xl font-bold">School Directory</h1>
                <div className="flex gap-4 justify-center">
                    <Link href="/addSchool" className="px-4 py-2 rounded bg-gray-900 text-white">Add School</Link>
                    <Link href="/showSchools" className="px-4 py-2 rounded border">Show Schools</Link>
                </div>
            </div>
        </main>
    );
}