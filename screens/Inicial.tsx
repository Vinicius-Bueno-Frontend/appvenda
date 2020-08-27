import * as React from "react";
import { Text, View } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";

export default function Inicial() {
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  //Carregar a api com os dados do banco de dados.
  //Executar a consulta listartelainicial

  React.useEffect(() => {
    fetch("http://192.168.15.5/loja/service/produto/listarTelaInicial.php")
      .then((response) => response.json())
      .then((produtos) => setDados(produtos.saida))
      .catch((error) => console.error(error))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View style={estilo.area}>
      <ScrollView>
        <Image
          source={require("../assets/images/produtos.png")}
          style={estilo.imagem}
        />

        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View>
                <Image source={require("../assets/images/monitor1.png")} />
                <Text>
                  Nome:{item.nomeproduto} | {item.preco} | {item.foto}
                </Text>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </View>
  );
}

const estilo = StyleSheet.create({
  imagem: {},
  area: {
    backgroundColor: "white",
  },
});
