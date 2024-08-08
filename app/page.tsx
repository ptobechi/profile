import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import LoginBtn from "@/components/auth/login-btn";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const Home = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center
      bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]
    from-sky-400 to to-blue-800"
    >
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          font.className
          )}>
          🔐 Auth 
        </h1>
        <p className="text-white text-lg">
          A simple authentication service
        </p>
        <LoginBtn>
          <Button variant={"secondary"} size="lg">Signin</Button>
        </LoginBtn>
      </div>
    </main>
  );
}
export default Home;
