import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Study Notes Sharing
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        Upload, browse, and share study notes with your classmates — organized
        by subject and semester.
      </p>
      <div className="flex gap-4">
        <Link
          href="/notes"
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Notes
        </Link>
        <Link
          href="/signup"
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
