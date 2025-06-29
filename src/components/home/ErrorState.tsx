"use client"

interface ErrorStateProps {
  error: string
  onRetry?: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const isTeapotError = error.includes("418") || error.includes("teapot")
  const isServerError = error.includes("503") || error.includes("server")

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{isTeapotError ? "🫖" : isServerError ? "🔧" : "⚠️"}</div>

      <h2 className="text-2xl font-bold mb-2">
        {isTeapotError
          ? "Marvel API Temporarily Unavailable"
          : isServerError
            ? "Server Maintenance"
            : "Something went wrong"}
      </h2>

      <p className="text-gray-600 mb-4 max-w-md mx-auto">
        {isTeapotError
          ? "The Marvel API is temporarily down for maintenance. Please try again in a few minutes."
          : isServerError
            ? "The server is currently undergoing maintenance. Please try again later."
            : "We're having trouble loading the characters. Please try again."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}

      <div className="mt-4 text-sm text-gray-500">Error: {error}</div>
    </div>
  )
}
