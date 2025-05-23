import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          Nº 1 En gestión de tareas
        </div>

        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
        Taskify ayuda a los equipos a avanzar.
        </h1>
        <div className="text-3xl md:text-6x bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Pruebalo ahora
        </div>
      </div>

      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs text-center mx-auto",
          textFont.className
        )}
      >
        Colabora, gestiona proyectos y alcanza nueva productividad.
      </div>

      <Button className="mt-6" size="lg" asChild>
        <Link href="sign-up">Obten gratis</Link>
      </Button>
    </div>
  );
}
