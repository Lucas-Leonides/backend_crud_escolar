import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Button, View, TextInput, useColorScheme } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Teste1Screen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [className, setClassName] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showButtons, setShowButtons] = useState(null); // Estado para controlar quais botões mostrar

  const colorScheme = useColorScheme(); // Detecta o tema atual

  // Função para buscar dados dos alunos
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://192.168.0.115:3000/students');
      console.log('Alunos recebidos:', response.data);
      setStudents(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    try {
      const studentData = { name, birthDate, registrationNumber, class: className };
      if (selectedStudentId) {
        await axios.put(`http://192.168.0.115:3000/students/${selectedStudentId}`, studentData); 
      } else {
        await axios.post('http://192.168.0.115:3000/students', studentData); 
      }
      resetForm();
      fetchStudents();
    } catch (error) {
      console.error('Erro ao enviar dados do aluno:', error);
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setBirthDate(student.birthDate.split('T')[0]);
    setRegistrationNumber(student.registrationNumber);
    setClassName(student.class);
    setSelectedStudentId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.0.115:3000/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setBirthDate('');
    setRegistrationNumber('');
    setClassName('');
    setSelectedStudentId(null);
  };

  const toggleButtons = (studentId) => {
    setShowButtons(showButtons === studentId ? null : studentId); // Alterna a visibilidade dos botões
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Carregando...</ThemedText>
      </View>
    );
  }

  // Agrupando alunos por classe
  const groupedStudents = students.reduce((acc, student) => {
    (acc[student.class] = acc[student.class] || []).push(student);
    return acc;
  }, {});

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo_mediotec.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Adicione alunos</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.formContainer}>
        <TextInput
          style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          placeholder="Nome"
          placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#666'}
          value={name}
          onChangeText={setName}
        />
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'YYYY-MM-DD',
          }}
          style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          placeholder="Data de Nascimento (YYYY-MM-DD)"
          placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#666'}
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <TextInput
          style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          placeholder="Número de Registro"
          placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#666'}
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
        />
        <TextInput
          style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          placeholder="Classe"
          placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#666'}
          value={className}
          onChangeText={setClassName}
        />
        <View style={styles.buttonContainer}>
          <Button title={selectedStudentId ? "Atualizar Aluno" : "Adicionar Aluno"} onPress={handleSubmit}
          color="#683ba8" />
          <View style={styles.buttonSpacer} />
          <Button title="Limpar" onPress={resetForm}
          color="#683ba8"
           />
          
        </View>
      </ThemedView>

      {Object.entries(groupedStudents).map(([className, students]) => (
        <ThemedView key={className} style={styles.classContainer}>
          <ThemedText type="subtitle">Classe: {className}</ThemedText>
          {students.map(student => (
            <ThemedView key={student._id} style={styles.studentContainer}>
              <ThemedText style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }} onPress={() => toggleButtons(student._id)}>
                {student.name} - {student.class} (Registro: {student.registrationNumber})
              </ThemedText>
              {showButtons === student._id && (
                <View style={styles.buttonGroup}>
                  <Button title="Editar" onPress={() => handleEdit(student)} 
                    color="#683ba8"/>
                  <Button title="Deletar" onPress={() => handleDelete(student._id)}
                  color="#683ba8" />
                </View>
              )}
            </ThemedView>
          ))}
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: -35,
    left: 0,
    position: 'absolute',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius:20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonSpacer: {
    width: 10,
  },
  classContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
});