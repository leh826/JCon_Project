import { View, TouchableOpacity, Text, TextInput, Button, Touchable} from 'react-native'
import React, {useState} from 'react'
import { auth } from '../../Firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import "firebase/firestore";
import { firebase } from '../../Firebase/firebaseConfig';
import { getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { useUser } from '../../Scripts/userName';

export default function LoginScreen() {
  const {setUserName} = useUser();
    const [userData, setUserData] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    const navigation = useNavigation(); 

    useEffect(() => {
    
      async function fetchUserData() {
        try {
          const db = getFirestore();
          const usersCollection = collection(db, "usuarios");
          const q = query(usersCollection, where("Email", "==", {userEmail})); 
  
          const querySnapshot = await getDocs(q);
          const userDataArray = querySnapshot.docs.map(doc => doc.data());
          setUserData(userDataArray[0]);
          
          setUserName(userData.Name);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
  
      fetchUserData();
    }, []);

    function newUser(){
      navigation.navigate('Register'); // Função para navegar para a tela de registro
    }

    function userLogin(){
        signInWithEmailAndPassword(auth, userEmail, userPassword) // Função para fazer login com email e senha
        .then((userCredential) => { // Se o login for bem-sucedido
            const user = userCredential.user;
            alert("Login efetuado com sucesso!"); // Exibe uma mensagem de sucesso
            console.log(user); // Loga o usuário no console
            
            navigation.navigate('Home'); // Navega para a tela Home após o login

        })
        .catch((error) => { // Se houver algum erro no login
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage); // Exibe uma mensagem de erro
        })
    }
    
  return (
    <View> 
      <Text style={styles.titulo}>Login</Text> 
      <Text style={styles.subtitulo}>Entre com sua conta</Text> 

    <View style={styles.corpo}>
    {/* Não estva pegando os icones, não sei pq.
      <MaterialIcons
            name="email"
            size={30}
            style={styles.iconemail} // Ícone para o email
          />
          */}
      <TextInput      
          style={styles.email} // Campo de entrada para o email
          placeholder='Email'
          placeholderTextColor={Colors.AZUL_PACIFICO} 
          keyboardType='email-address'
          autoCapitalize='none' 
          value={userEmail} 
          onChangeText={setUserEmail}
      />
          {/* Não estva pegando os icones, não sei pq.
          <MaterialIcons
            name="vpn-key"
            size={30}
            style={styles.iconsenha} // Ícone para a senha
          />
          */}
      <TextInput 
          style={styles.senha} // Campo de entrada para a senha
          placeholder='Senha' 
          placeholderTextColor={Colors.AZUL_PACIFICO} 
          autoCapitalize='none'
          secureTextEntry
          value={userPassword} 
          onChangeText={setUserPassword}
      />
                                        {/* falta o link para o esqueceu a senha*/}
      <Text style={styles.redefinirsenha}>Esqueceu a senha?</Text> 
      <TouchableOpacity style={styles.botao} onPress={userLogin}> 
      <Text style={styles.botaotxt}>Login</Text>
    </TouchableOpacity>
      <View> 
                                                                                                  {/* falta o link para o cadastro*/}
        <Text style={styles.naotemconta}>Não tem uma conta?<Text style={styles.cadastrar} onPress={newUser}> Cadastrar</Text></Text>             
      </View>
    </View>
    </View>
  )
}
