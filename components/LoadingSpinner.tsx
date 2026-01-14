export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent mb-4" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
