import { getUserID } from "@/utils/token";
import { gql, useQuery } from "@apollo/client";
import { View, Text, ScrollView } from "@gluestack-ui/themed";
import { ServiceCard } from "./ServiceCard";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

const GET_ACTIVE_AND_NEW_BOOKINGS = gql`
  query Servicios($trabajadorId: Int!) {
    servicios(
      where: {
        and: [
          {
            or: [
              { estado: { eq: "pendiente" } }
              { trabajadorId: { eq: $trabajadorId } }
            ]
          }
          {
            fecha_Completado: { eq: "1753-01-01 00:00:00" }
            trabajador: { email: { eq: "defaultworker@mail.co" } }
          }
        ]
      }
    ) {
      items {
        categoria_ServicioId
        clienteId
        descripcion
        estado
        fecha_Completado
        fecha_Realizacion
        fecha_Solicitud
        id_Calificacion
        id_Factura
        id_Servicio
        trabajadorId
      }
    }
  }
`;
const GET_BOOKINGS_DETAILS = gql`
  query categoriaServicio {
    categoriasServicios {
      items {
        id_Servicio
        descripcion
        imagen
        nombre
        precio
      }
    }
  }
`;

export default function HomeTrabajador() {
  const [declined, setDeclined] = useState<number[]>(
    JSON.parse(SecureStore.getItem("declined") || "[]")
  );

  const decline = (id: number) => {
    const declined = JSON.parse(SecureStore.getItem("declined") || "[]");
    declined.push(id);
    SecureStore.setItem("declined", JSON.stringify(declined));
    console.log(declined);
    setDeclined(declined);
  };
  const workerID = getUserID();
  const { loading, error, data } = useQuery<{
    servicios: {
      items: {
        categoria_ServicioId: number;
        clienteId: number;
        descripcion: string;
        estado: string;
        fecha_Completado: string;
        fecha_Realizacion: string;
        fecha_Solicitud: string;
        id_Calificacion: number;
        id_Factura: number;
        id_Servicio: number;
        trabajadorId: number;
      }[];
    };
  }>(GET_ACTIVE_AND_NEW_BOOKINGS, {
    variables: { trabajadorId: workerID },
  });

  const {
    loading: loadingDetails,
    error: errorDetails,
    data: dataDetails,
  } = useQuery<{
    categoriasServicios: {
      items: {
        id_Servicio: number;
        descripcion: string;
        imagen: string;
        nombre: string;
        precio: number;
      }[];
    };
  }>(GET_BOOKINGS_DETAILS);

  if (loading || loadingDetails) return <Text>Loading...</Text>;
  if (error || errorDetails) return <Text>Error! ${error?.message}</Text>;
  if (!data || !dataDetails) return <Text>No data</Text>;
  //Dividir por ya asignados, (tienen el id del trabajador) y los que no tienen trabajador asignado
  const filteredData = data.servicios.items.filter(
    (e) => !declined.includes(e.id_Servicio)
  );
  const yetToAsign = filteredData
    .filter(
      (booking) =>
        booking.estado === "pendiente" && booking.trabajadorId !== workerID
    )
    .map((booking) => ({
      ...booking,
      fecha_Realizacion: new Date(booking.fecha_Realizacion),
      fecha_Completado: new Date(booking.fecha_Completado),
      fecha_Solicitud: new Date(booking.fecha_Solicitud),
    }))
    .map((booking) => ({
      ...booking,
      Categoria: dataDetails?.categoriasServicios.items.find(
        (category) => category.id_Servicio === booking.categoria_ServicioId
      ),
    }));
  const asignedBookings = filteredData
    .filter((booking) => booking.trabajadorId === workerID)
    .map((booking) => ({
      ...booking,
      fecha_Realizacion: new Date(booking.fecha_Realizacion),
      fecha_Completado: new Date(booking.fecha_Completado),
      fecha_Solicitud: new Date(booking.fecha_Solicitud),
    }))
    .map((booking) => ({
      ...booking,
      Categoria: dataDetails?.categoriasServicios.items.find(
        (category) => category.id_Servicio === booking.categoria_ServicioId
      ),
    }));

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 24 }}>
        Service Offers
      </Text>
      <ScrollView marginBottom={40}>
        <Text style={{ fontWeight: "bold" }}>Asignados</Text>
        <View>
          {asignedBookings.length > 0 ? (
            asignedBookings.map((booking) => {
              return (
                <ServiceCard
                  decline={decline}
                  key={booking.id_Servicio}
                  category={booking.Categoria?.nombre || ""}
                  completeDate={booking.fecha_Realizacion}
                  id={booking.id_Servicio}
                />
              );
            })
          ) : (
            <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>
              No tienes servicios asignados
            </Text>
          )}
        </View>
        <Text style={{ fontWeight: "bold" }}>Sin asignar</Text>
        <View gap={10}>
          {yetToAsign.map((booking) => {
            return (
              <ServiceCard
                decline={decline}
                key={booking.id_Servicio}
                category={booking.Categoria?.nombre || ""}
                completeDate={booking.fecha_Realizacion}
                id={booking.id_Servicio}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
