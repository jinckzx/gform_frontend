import FormFiller from "@/components/FormFiller";
import FloatingImage from "@/components/FloatingImage";
import sunflowerBg from "@/assets/sunflower-bg.jpg";
import baby1 from "@/assets/baby1.jpg";
import baby2 from "@/assets/baby2.jpg";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${sunflowerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-background/75 backdrop-blur-sm" />
      </div>

      {/* Floating Images */}
      <FloatingImage
        src={baby1}
        alt="Cute photo 1"
        className="top-20 left-8 md:left-20 z-10"
        animationClass="animate-float-1"
      />
      <FloatingImage
        src={baby2}
        alt="Cute photo 2"
        className="bottom-20 right-8 md:right-20 z-10"
        animationClass="animate-float-2"
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center py-12">
        <header className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-2">
            🌻 Form Filler Magic 🌻
          </h1>
          <p className="text-muted-foreground font-body text-lg md:text-xl">
            Made with love for Anmol
          </p>
        </header>

        <FormFiller />

        <footer className="mt-12 text-center text-muted-foreground font-body text-sm">
          <p>✨ Powered by sunflowers and good vibes ✨</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
