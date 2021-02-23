import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import api from './services/api';

export default function App(){

  const [projects, setProjects] = useState([]);

  useEffect (() => {
    api.get('projects').then(response =>{
      console.log(response.data);
      console.log('Hi there!');
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Diego Fernandes'
    });

    const project = response.data;
    setProjects ([...projects, project]);
  };

  return (
    <>
      <StatusBar barStyle = 'light-content'/>    
      <SafeAreaView style = {styles.container}>
        <FlatList
          data = {projects}
          keyExtractor = {project =>project.id}
          renderItem = {( { item: project } ) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.button} 
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}> Add Project </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>  
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#7159C1',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  title: {
    color: '#FFF',
    fontSize: 18,
    // fontWeight: 'bold'
  },

  button: {
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

});