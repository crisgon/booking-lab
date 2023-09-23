"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getAllBookings, removeBooking } from "@/services/booking";
import { useEffect, useState } from "react";
import { Schedule } from "../../../database.types";

export default function List() {
  const [data, setData] = useState<Schedule[]>([]);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const rooms = {
    "lab-1": "Lab 1",
    "lab-2": "Lab 2",
    "lab-3": "Lab 3 - Robótica",
    "lab-4": "Lab 4",
  };

  async function getData() {
    const res = await getAllBookings();

    if (res.data) {
      setData(res.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function removeData() {
    if (!idToDelete) return;
    const { error } = await removeBooking(idToDelete);

    if (!error) {
      getData();
      setIdToDelete(null);
    }
  }
  return (
    <div className="m-auto mt-10 w-[1000px]">
      <AlertDialog>
        <h1 className="text-2xl font-semibold leading-none tracking-tight pb-10">
          Reservas
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Sala</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Reservado por</TableHead>
              <TableHead className="text-right">Reservado para</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">
                  {rooms[s.room as keyof typeof rooms]}
                </TableCell>
                <TableCell>
                  {s.status === "cancel" ? "Cancelado" : "Confirmado"}
                </TableCell>
                <TableCell>{s.booking_date}</TableCell>
                <TableCell>
                  {s.booking_time_start} - {s.booking_time_end}
                </TableCell>
                <TableCell className="text-right">{s.authorizer}</TableCell>
                <TableCell className="text-right">{s.booked_by}</TableCell>
                <TableCell className="text-right underline text-red-600 cursor-pointer">
                  <AlertDialogTrigger onClick={() => setIdToDelete(s.id)}>
                    Cancelar
                  </AlertDialogTrigger>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja realmente cancelar essa reserva?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={removeData}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
