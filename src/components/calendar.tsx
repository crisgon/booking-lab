"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

import { getAllBookings } from "@/services/booking";
import { subscribe } from "@/lib/utils";

export function BookingCalendar() {
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: ["day"] as any,
    }),
    []
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    subscribe("reload-calendar", getData);
  }, []);

  async function getData() {
    setLoading(true);
    const { data } = await getAllBookings();
    setEvents(
      data
        ? data.map((booking) => {
            return {
              id: booking.id.toString(),
              title: `Reservado para: ${booking.booked_by}`,
              resourceId: booking.room,
              start: new Date(
                `${booking.booking_date} ${booking.booking_time_start}`
              ),
              end: new Date(
                `${booking.booking_date} ${booking.booking_time_end}`
              ),
            };
          })
        : []
    );
    setLoading(false);
  }

  const resourceMap = [
    { resourceId: "lab-1", resourceTitle: "Lab 1" },
    { resourceId: "lab-2", resourceTitle: "Lab 2" },
    { resourceId: "lab-3", resourceTitle: "Lab 3 - Robótica" },
    { resourceId: "lab-4", resourceTitle: "Lab 4" },
  ];

  var defaultMessages = {
    date: "Data",
    time: "Hora",
    event: "Evento",
    allDay: "Dia Todo",
    week: "Semana",
    work_week: "Eventos",
    day: "Dia",
    month: "Mês",
    previous: "Anterior",
    next: "Próximo",
    yesterday: "Ontem",
    tomorrow: "Amanhã",
    today: "Hoje",
    agenda: "Agenda",
    noEventsInRange: "Não há eventos no período.",
    showMore: function showMore(total: any) {
      return "+" + total + " mais";
    },
  };

  return (
    <div className="w-full">
      {loading ? (
        <span>Carregando...</span>
      ) : (
        <Calendar
          messages={defaultMessages}
          formats={{
            agendaDateFormat: "DD/MM ddd",
            weekdayFormat: "dddd",
          }}
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          step={30}
          views={views}
        />
      )}
    </div>
  );
}
