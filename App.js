/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await AsyncStorage.getItem('todos');
        if (data != null) {
          setTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, [todos]);

  const createBook = () => {
    setTodos([...todos, { todo: data, id: Math.random(), checklist: false }]);
  };

  const deleteTodo = idTodo => {
    const dataTodo = todos.filter(item => item.id !== idTodo);
    setTodos(dataTodo);
  };

  const doneTodo = idTodo => {
    const dataTodo = todos.map(item => {
      if (item.id === idTodo) {
        return {...item, checklist: true};
      }
      return item;
    });

    setTodos(dataTodo);
  };

  return (
    <View style={styles.sectionContainer}>
      <TextInput style={styles.input} value={data} onChangeText={text => setData(text)} />
      <TouchableOpacity style={styles.button} onPress={createBook}>
        <Text>Create To Do</Text>
      </TouchableOpacity>
      {todos?.map((item) => (
        <View key={item.id} style={styles.flex}>
          <View style={{backgroundColor: item.checklist ? 'blue' : ''}}>
            <Text style={styles.sectionTitle}>{item.todo}</Text>
          </View>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteTodo(item.id)}/>
            <Button
              title="Done"
              color="#f194ff"
              onPress={() => doneTodo(item.id)}
            />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#70afce',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default App;
