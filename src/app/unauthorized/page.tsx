import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex items-center justify-center h-screen p-16 bg-gray-50 ">
            <div className="container flex flex-col items-center ">
                <div className="flex flex-col gap-6 max-w-md text-center">
                    <h2 className="font-extrabold text-9xl text-text ">401</h2>
                    <p className="text-text md:text-2xl ">
                        You don&apos;t have permission to access this page.
                    </p>
                    <Link
                        href="/"
                        className="px-3 py-4 text-xl font-semibold rounded bg-primary text-gray-50 hover:text-gray-200"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </section>
    );
}
