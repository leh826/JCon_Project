import { View, Text, TextInput, SafeAreaView, Switch, KeyboardAvoidingView} from 'react-native'
import React, { useState, isEnabled } from 'react'
import styles from './styles';
import Slider from '@react-native-community/slider';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';


export default function CreateJobsScreen({navigation}) {

  const [jobName, setJobName] = useState('');
  const [jobLocal, setJobLocal] = useState('');
  const [jobDate, setJobDate] = useState('');
  const [jobInformations, setJobInformations] = useState('');
  const [jobRequisite, setJobRequisite] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobLimit, setJobLimit] = useState(0);
  const [jobValue, setJobValue] = useState(0);
  const [jobCreate, setJobCreate] = useState('');
  const [sliderVisible, setSliderVisible] = useState(false);
 
  const categories = ['Limpeza','Manuntenção','Alimentação','Construção', 'Beleza','Jardinagem','Informática',
                      'Educação', 'Segurança','Transporte','Cuidado','Comunicação', 'Outro' ];

  async function addJob(){
    try{
      const db = getFirestore();
      const usersCollection = collection(db, "vagas");

      await addDoc(usersCollection, {
        Name: jobName,
        Local: jobLocal,
        Date: jobDate,
        Informations: jobInformations,
        Requisite: jobRequisite,
        Category: jobCategory,
        Value: jobValue,
        Limit: jobLimit,
      });
      
      console.log("Vaga criada com sucesso!");

      setJobName('');
      setJobLocal('');
      setJobDate('');
      setJobInformations('');
      setJobRequisite('');
      setJobCategory('');
      setJobLimit(0);
      setJobValue(0);
      setSliderVisible(false);
      
      set
    }catch (error) {

      console.error("Erro ao criar uma vaga:", error);
      
    }
  }

  function newJob(){
    if( jobName === '' || jobLocal === '' || jobDate === '' || jobInformations === ''){
        alert ('Os campos Nome, Loca, Data e Descrição devem ser preenchidos!');
        return;
    } else{
        addJob()
        .then(() => {

            alert('O vaga ' + jobName + ' foi criada!')
            navigation.navigate('Jobs');

        })
        .catch((error) =>{
            const errorMessage = error.message;
            alert(errorMessage);

            navigation.navigate('Jobs');
        });
    }

}

  return (
    <SafeAreaView style={{flex: 1 }}>
      <ScrollView>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>

          <Text style={{fontSize: 30, color: Colors.MALTE}}>Cadastro de Vaga</Text>

          <View style={styles.containerInput}>
            <TextInput 
                    style={styles.entrada} 
                    placeholder='Nome da Vaga' 
                    autoCapitalize='none' 
                    value={jobName} 
                    onChangeText={setJobName}   
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput 
                    style={styles.entrada} 
                    placeholder='Local' 
                    autoCapitalize='none' 
                    value={jobLocal} 
                    onChangeText={setJobLocal}
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput 
                    style={styles.entrada} 
                    placeholder='Data' 
                    autoCapitalize='none' 
                    value={jobDate} 
                    onChangeText={setJobDate}
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput 
                    style={styles.entrada} 
                    placeholder='Descrição' 
                    autoCapitalize='none' 
                    value={jobInformations} 
                    onChangeText={setJobInformations}
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput 
                    style={styles.entrada} 
                    placeholder='Requisitos' 
                    autoCapitalize='none' 
                    value={jobRequisite} 
                    onChangeText={setJobRequisite}
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput
                    style={styles.entrada}  
                    placeholder='Categoria' 
                    autoCapitalize='none' 
                    value={jobCategory} 
                    onChangeText={setJobCategory}
            />

          </View>
          
          <View style={styles.containerText}>
            <Text style={styles.text}>Valor do Serviço</Text>
          </View>

          <View style={styles.containerInput}>
            <View style={styles.containerLimit}>
              <Slider
                  style={{width: 250, height: 40}}
                  minimumValue={0}
                  maximumValue={3000}
                  minimumTrackTintColor={Colors.MALTE}
                  maximumTrackTintColor={Colors.MALTE}
                  thumbTintColor={Colors.MALTE}
                  step={1}
                  value={jobValue}
                  onValueChange={(value) => setJobValue(value)}
              />
              <Text>{jobValue}</Text>
            </View>

          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Deseja limitar suas candidaturas?</Text>
            <TouchableOpacity>
              <Switch trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={setSliderVisible}
                      value={sliderVisible}
                      onPress={() => setSliderVisible(!sliderVisible)}
              />
            </TouchableOpacity>
          </View>

          {sliderVisible && (
            <View style={styles.containerInput}>
              <View style={styles.containerLimit}>
              <Slider
                  style={{width: 250, height: 40}}
                  minimumValue={0}
                  maximumValue={2000}
                  minimumTrackTintColor={Colors.MALTE}
                  maximumTrackTintColor={Colors.MALTE}
                  thumbTintColor={Colors.MALTE}
                  step={1}
                  value={jobLimit}
                  onValueChange={(value) => setJobLimit(value)}
              />
                <Text>{jobLimit}</Text>
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <View style={styles.button1}>
              <Text style={{color: 'white', fontSize: 17}} onPress={() => navigation.navigate('Tab')}> Cancelar </Text>
            </View>
            <View style={styles.button2}>
              <Text style={{color: 'white', fontSize: 17}} onPress={newJob}> Cadastar </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

