import { View, Text, SafeAreaView, Image, TextInput, FlatList, SectionList } from 'react-native'
import React, { useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from './style';
import Colors from '../../Utils/Colors';
import { Ionicons } from 'react-native-vector-icons';

const dataPatrocinados = [
  {
    id: '1',
    imageUrl: 'https://marketplace.canva.com/EAE-O4SYB1I/3/0/1600w/canva-logotipo-circular-floral-monograma-elegante-rosa-gold-Uv8mbLqwWZ4.jpg',
    title: 'Seviço de Fotografia',
    local: '  Nova Olinda, Castanhal - PA',
    data: '  01/02/2024',
    NameSub: 'Designer Da Mari',
    description: 'Estamos à procura de um(a) talentoso(a) fotógrafo(a). O candidato selecionado terá a oportunidade de capturar as imagens dos trabalhos, criar imagens impactantes e contribuir para a narrativa visual da nossa empresa.',
    requisite: 'Ser pontual.',
    money: '300 por dia',
  },
  {
    id: '2',
    imageUrl: 'https://st.depositphotos.com/29038680/54142/i/450/depositphotos_541429162-stock-photo-chicken-vector-design-logo-company.jpg',
    title: 'Serviço de Programação',
    local: '  Imperador, Castanhal - PA',
    data: '  10/04/2024',
    NameSub: 'Ariel Lima - Nail Designer',
    description: 'Estamos procurando um talentoso desenvolvedor de software para se juntar à nossa equipe de serviço de programação. O candidato selecionado terá que desenvolver um site de e-commerce para a empresa.',
    requisite: 'Ser pontual.',
    money: '300 por dia',
  },

  {
    id: '3',
    imageUrl: 'https://img.freepik.com/vetores-premium/design-de-logotipo-de-forca-de-letras-douradas_529200-203.jpg',
    title: 'Serviço de Faxina',
    local: '  Castanheira, Belém - PA',
    data: '  31/04/2024',
    NameSub: 'Carros',
    description: 'Estamos em busca de um profissional dedicado e confiável para se juntar à nossa equipe de serviço de faxina. O candidato selecionado será responsável por realizar limpeza e organização em residências ou ambientes comerciais, garantindo um espaço limpo e acolhedor para nossos clientes.',
    requisite: 'Ser pontual.',
    money: '50 por hora',
  },
];

const dataNaoPatrocinados = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Seviço de Fotografia',
    local: '  Nova Olinda, Castanhal - PA',
    data: '  01/02/2024',
    NameSub: 'Mauro',
    NameSub2: 'Patrocinado',
    description: 'Estamos à procura de um(a) talentoso(a) fotógrafo(a) para se juntar à nossa equipe de serviço de fotografia. O candidato selecionado terá a oportunidade de capturar momentos especiais, criar imagens impactantes e contribuir para a narrativa visual da nossa empresa.',
    requisite: 'Ser pontual.',
    money: '$300 dia',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Serviço de Programação',
    local: '  Imperador, Castanhal - PA',
    data: '  10/04/2024',
    NameSub: 'Yan',
    NameSub2: 'Patrocinado',
    description: 'Estamos procurando um talentoso desenvolvedor de software para se juntar à nossa equipe de serviço de programação. O candidato selecionado terá a oportunidade de trabalhar em projetos desafiadores e inovadores, contribuindo para o desenvolvimento de soluções tecnológicas de ponta.',
    requisite: 'Ser pontual.',
    money: '$300 dia',
  },

  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Serviço de Faxina',
    local: '  Castanheira, Belém - PA',
    data: '  31/04/2024',
    NameSub: 'Biatriz',
    description: 'Estamos em busca de um profissional dedicado e confiável para se juntar à nossa equipe de serviço de faxina. O candidato selecionado será responsável por realizar limpeza e organização em residências ou ambientes comerciais, garantindo um espaço limpo e acolhedor para nossos clientes.',
    requisite: 'Ser pontual.',
    money: '$50 hora',
  },
  {
    id: '4',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Serviço de Design',
    local: '  Juazeiro, Santa Izabel - PA',
    data: '  05/04/2024',
    NameSub: 'Regina',
    description: 'Estamos em busca de um talentoso designer gráfico para se juntar à nossa equipe de serviço de design. O candidato selecionado terá a oportunidade de trabalhar em uma variedade de projetos criativos, desde identidade visual de marca até materiais de marketing e design digital.',
    requisite: 'Ser pontual, saber de cores e banners',
    money: '$300 dia',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1642257859842-c95f9fa8121d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Serviço de Contabilidade',
    local: '  1901 Thornridge Cir. Shiloh, Hawaii 81063',
    data: '  02/03/2024',
    NameSub: 'Rubens',
    description: 'Estamos buscando um assistente de serviço de contabilidade comprometido e organizado para se juntar à nossa equipe. O candidato selecionado será responsável por auxiliar nas operações diárias do departamento contábil, garantindo a precisão e integridade dos registros financeiros da empresa.',
    requisite: 'Ser pontual.',
    money: '$300 dia',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Serviço de Tributação',
    local: '  Centro, Abaetetuba - PA',
    data: '  25/03/2024',
    NameSub: 'Mariana',
    description: 'Estamos em busca de um analista de serviço de tributação proativo e habilidoso para integrar nossa equipe. O candidato ideal será responsável por auxiliar na gestão e conformidade das obrigações tributárias da empresa, garantindo o cumprimento das leis fiscais e regulamentações aplicáveis.',
    requisite: 'Ser pontual.',
    money: '$200 dia',
  },
];

const Item = ({ imageUrl, title, local, data, description, requisite, navigation, money, NameSub,NameSub2 }) => (

  <View style={styles.item}>
    <View style={styles.ContainerImage}>
      <TouchableOpacity onPress={() => navigation.navigate('ExteProfile', { Nome: NameSub, Imagem: imageUrl})}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableOpacity>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title} onPress={() => navigation.navigate('JobsDesc', {
        JobTitle: title,
        JobLocal: local,
        JobDate: data,
        JobDesc: description,
        JobRequisite: requisite,
        JobMoney: money,
        JobSub: NameSub
      })}>
        {title}</Text>
      <Text style={styles.subtitle}>
        <Ionicons
          name="map-outline"
          size={10}
          color="write"
          onPress={() => { }}
        />
        {local}</Text>
      <Text style={styles.subtitle}>
        <Ionicons
          name="calendar-outline"
          size={10}
          color="write"
          onPress={() => { }}
        />
        {data}</Text>
    </View>

    <View style={styles.Button}>
      <Text style={styles.buttomText} onPress={() => navigation.navigate('Chat', { contactName: NameSub })}> Chat </Text>
    </View>
  </View>

);

const Filter = [
  { id: 1, name: "Empresas" },
  { id: 2, name: "Pessoas" },
  { id: 3, name: "Cargos" }
];

const sections = [
  { title: "Patrocinados", data: dataPatrocinados },
  { title: "Não patrocinados", data: dataNaoPatrocinados }
];

export default function JobScreen() {

  const [useFilter, setUseFilter] = useState([]);
  const [Options, setOptions] = useState();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [searchWord, setSearchWord] = useState('');

  return (

    <SafeAreaView>


      <View style={{backgroundColor: Colors.MALTE, height: 100}}>
        <View style={styles.viewBusca}>

          <TextInput style={styles.inputBusca} placeholder="Pesquisar"
            autoCapitalize='none'
            autoCorrect={false}
            value={text}
            onChangeText={(value) => setText(value)}
          />

         <TouchableOpacity style={{margin: 10}}>
            <Image source={require('../../../assets/images/icon-search.png')} style={{height: 20, width: 20 }}/>
        </TouchableOpacity> 

        </View>
      </View>
      <View style={styles.boxTitle}>

        <Text style={styles.textTitle}>Vagas</Text>

        <TouchableOpacity onPress={() => setPickerVisible(!pickerVisible)}>
          <Text style={styles.textFiltrar}>Filtrar</Text>
        </TouchableOpacity>
        {pickerVisible && (
          <Picker
          selectedValue ={useFilter}
          onValueChange={(itemValue) =>
            setUseFilter(itemValue)
          }>
          {
            Filter.map((fil) =>{
              <Picker.Item key={fil.id} label={fil.name} value={fil.name}/>
            })
          }
        </Picker>
        )}

      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => <Item {...item} navigation={navigation} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </SafeAreaView>
  )
}



