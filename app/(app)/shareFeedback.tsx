import Loader from "@/components/Loader";
import { gql, useQuery } from "@apollo/client";
import { View, Text, Image } from "@gluestack-ui/themed";
import { useRoute } from "@react-navigation/native";

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
  }
`;

export default function ShareFeedbackScreen() {
  const serviceID = Number((useRoute().params as any)?.serviceID);
  const { loading, error, data } = useQuery(GET_SERVICE_DETAILS, {
    variables: { id: serviceID },
  });
  const service = data?.categoriasServicios?.items[0] as {
    id_Servicio: number;
    descripcion: string;
    imagen: string;
    nombre: string;
    precio: number;
  };
  const feedback = data?.calificaciones?.items[0] as {
    comentario: string;
    fecha: string;
    id_Calificacion: number;
    id_Servicio: number;
    id_Trabajador: number;
    puntuacion: number;
  };
  if (loading) return <Loader />;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View flex={1} mx={10}>
      <View flexDirection="row" gap={10}>
        <Image source={{ uri: service.imagen }} width={100} height={100} />
        <Text>{service.nombre}</Text>
      </View>
    </View>
  );
}
