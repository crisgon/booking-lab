"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/booking-form";
import { useState } from "react";
import { Bookmark, Computer } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="m-auto  w-[300px] py-10 flex flex-col items-center gap-4">
        <Computer size={48} />
        <h1 className="text-xl font-bold">Reserva de laboratórios</h1>{" "}
      </div>
      <nav className="w-[500px] flex items-center py-8 space-x-4 m-auto">
        <DialogTrigger asChild>
          <Button variant="default" className="bg-emerald-500 lex gap-2">
            <Bookmark size={16} />
            Reservar
          </Button>
        </DialogTrigger>
        <Link
          href="/"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            path === "/" ? "underline text-white font-bold" : ""
          )}
        >
          Calendário de reservas
        </Link>
        <Link
          href="/reservas"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            path === "/reservas" ? "underline text-white font-bold" : ""
          )}
        >
          Todas as reservas
        </Link>
      </nav>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservar Sala </DialogTitle>
          <DialogDescription>Faça a reserva de uma sala</DialogDescription>
        </DialogHeader>
        <BookingForm onCloseModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
