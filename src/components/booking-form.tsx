"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createBooking } from "@/services/booking";
("@/services");
import { useState } from "react";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { publish } from "@/lib/utils";

interface BookingFormProps {
  onCloseModal(): void;
}

export default function BookingForm({ onCloseModal }: BookingFormProps) {
  const { toast } = useToast();

  const [room, setRoom] = useState("");
  const [owner, setOwner] = useState("");
  const [authorizer, setAuthorizer] = useState("");
  const [date, setDate] = useState("");
  const [starTime, setStarTime] = useState("");
  const [endTime, setEndTime] = useState("");

  async function submitForm() {
    if (!room && !owner && !authorizer && !date && !starTime && !endTime) {
      toast({
        title: "Erro",
        variant: "destructive",
        description: "Preencha todos os campos!",
      });
      return;
    }
    const { error, data } = await createBooking({
      authorizer,
      room,
      booked_by: owner,
      booking_date: date,
      booking_time_end: endTime,
      booking_time_start: starTime,
      booking_unique_timestamp: `${room}${date}${starTime}${endTime}`,
    });

    if (error) {
      toast({
        title: "Erro",
        variant: "destructive",
        description: "Já existe uma reserva nesse dia e horário",
      });
      return;
    }

    if (data) {
      toast({
        title: "Sucesso",
        description: "Reserva feita com sucesso!",
      });
      onCloseModal();
      publish("reload-calendar");
    }
  }

  return (
    <div>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="owner">Reservar para:</Label>
          <Input id="owner" onChange={(e) => setOwner(e.target.value)} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="rooms">Laboratório</Label>
          <Select onValueChange={(e) => setRoom(e)}>
            <SelectTrigger id="rooms">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="lab-1">Lab 1</SelectItem>
              <SelectItem value="lab-2">Lab 2</SelectItem>
              <SelectItem value="lab-3">Lab 3 - Robótica</SelectItem>
              <SelectItem value="lab-4">Lab 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="date">Data:</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="startTime">Horário de inicio:</Label>
          <Input
            id="startTime"
            type="time"
            onChange={(e) => setStarTime(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="endTime">Horário de término:</Label>
          <Input
            id="endTime"
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="authorizer">Autorizado por:</Label>
          <Input
            id="authorizer"
            onChange={(e) => setAuthorizer(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter className="mt-10">
        <Button type="submit" onClick={submitForm} className="bg-emerald-500">
          Reservar
        </Button>
      </DialogFooter>
    </div>
  );
}
