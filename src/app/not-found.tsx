import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-accent-50 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Characters
        </Link>
      </div>
    </div>
  )
}
