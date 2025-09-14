import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 bg-white overflow-y-auto">
        <div className="p-8 items-center justify-center flex">
          <p className="text-lg text-gray-700">
            Welcome! This is a simple message in the main content area.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
