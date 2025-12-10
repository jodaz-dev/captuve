import { Header } from "@/components/Header";

export default function Store() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Tienda del Fotógrafo</h1>
        <p>Esta es la página de la tienda.</p>
      </div>
    </div>
  );
}
