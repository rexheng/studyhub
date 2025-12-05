import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 pt-12 pb-4 bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground font-medium">Good morning,</span>
        <h1 className="text-xl font-bold text-foreground">Rex</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-secondary/50 px-3 py-1 rounded-full">
          <span className="text-amber-500">🔥</span>
          <span className="text-sm font-bold text-foreground">15</span>
        </div>
        
        <div className="relative">
          <Bell className="w-6 h-6 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center rounded-full border-2 border-background">
            3
          </span>
        </div>

        <Avatar className="w-8 h-8 border-2 border-primary cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>RX</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
