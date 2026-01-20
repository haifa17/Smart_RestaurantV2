export default function MenuNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center px-4">
                <div className="text-6xl mb-4">🍽️</div>
                <h1 className="text-2xl font-bold mb-2">Menu Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The restaurant you're looking for doesn't exist or is no longer available.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
