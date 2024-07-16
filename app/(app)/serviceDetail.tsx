import React from "react";
import { View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, useTheme } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import Loader from "@/components/Loader";

const GET_SERVICE_DETAILS = gql`
  query categoriaServicio($id: Int!) {
    categoriasServicios(
      where: { servicios: { some: { id_Servicio: { eq: $id } } } }
    ) {
      items {
        id_Servicio
        descripcion
        imagen
        nombre
        precio
      }
    }
    servicios(where: { id_Servicio: { eq: $id } }) {
      items {
        descripcion
        estado
        fecha_Completado
        fecha_Realizacion
      }
    }
    calificaciones(where: { id_Servicio: { eq: $id } }) {
      items {
        comentario
        fecha
        id_Calificacion
        id_Servicio
        id_Trabajador
        puntuacion
      }
    }
    trabajadores(
      where: {
        servicios: { some: { id_Servicio: { eq: $id } } }
        email: { neq: "defaultworker@mail.co" }
      }
    ) {
      items {
        disponibilidad
        email
        fecha_Registro
        id
        nombre
        password
        salt
        telefono
      }
    }
  }
`;

type ServiceDetail = {
  categoriasServicios: {
    items: {
      id_Servicio: number;
      descripcion: string;
      imagen: string;
      nombre: string;
      precio: number;
    }[];
  };
  servicios: {
    items: {
      descripcion: string;
      estado: string;
      fecha_Completado: string;
      fecha_Realizacion: string;
    }[];
  };
  calificaciones: {
    items: {
      comentario: string;
      fecha: string;
      id_Calificacion: number;
      id_Servicio: number;
      id_Trabajador: number;
      puntuacion: number;
    }[];
  };
  trabajadores: {
    items: {
      disponibilidad: string;
      email: string;
      fecha_Registro: string;
      id: number;
      nombre: string;
      password: string;
      salt: string;
      telefono: string;
    }[];
  };
};

const serviceDetail = () => {
  const theme = useTheme();
  const route = useRoute();
  const id = Number((route.params as { [key: string]: any }).id);
  console.log(id);
  const { loading, error, data } = useQuery<ServiceDetail>(
    GET_SERVICE_DETAILS,
    { variables: { id } }
  );
  const category = data?.categoriasServicios.items[0];
  const service = data?.servicios.items[0];
  const rating = data?.calificaciones.items[0];
  const worker = data?.trabajadores.items[0];

  if (loading) return <Loader />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          borderRadius: 8,
          padding: 16,
          borderWidth: 2,
          borderColor: "#ccc",
        }}
      >
        <Image
          source={{ uri: category?.imagen }} // Replace with your image URL
          style={{ width: "100%", height: 150, borderRadius: 8 }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>
          {category?.nombre}
        </Text>
        <Text style={{ fontSize: 14 }}>{service?.estado}</Text>
        <Text style={{ fontSize: 14 }}>
          {service?.estado === "completado"
            ? service?.fecha_Completado.substring(0, 10).replace(/-/g, "/")
            : service?.fecha_Realizacion.substring(0, 10).replace(/-/g, "/")}
        </Text>
        <Text style={{ fontSize: 14 }}>{category?.precio} DOP</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
        >
          <Image
            source={{ uri: "https://your-profile-url.com/profile.jpg" }} // Replace with profile image URL
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          {worker && (
            <View style={{ marginLeft: 8 }}>
              <Text style={{ fontSize: 14 }}>{worker.nombre}</Text>
              <Text style={{ fontSize: 12 }}>View profile</Text>
            </View>
          )}
        </View>
        <Text style={{ fontSize: 14, marginTop: 16 }}>Description</Text>
        <Text style={{ fontSize: 14 }}>
          {service?.descripcion || category?.descripcion}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 16 }}>Rating</Text>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          {[...Array(5)].map((_, index) => (
            <Ionicons key={index} name="star-outline" size={24} />
          ))}
        </View>
        <View style={{ marginTop: 16, alignItems: "center" }}>
          <Pressable
            onPress={() => {
              router.push("/shareFeedback");
            }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 8,
            }}
          >
            <Text>Share Feedback</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default serviceDetail;
