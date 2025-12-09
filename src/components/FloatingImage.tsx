import { cn } from "@/lib/utils";

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  animationClass: string;
}

const FloatingImage = ({ src, alt, className, animationClass }: FloatingImageProps) => {
  return (
    <div
      className={cn(
        "absolute pointer-events-none select-none",
        animationClass,
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl shadow-card border-4 border-card opacity-80"
      />
    </div>
  );
};

export default FloatingImage;
