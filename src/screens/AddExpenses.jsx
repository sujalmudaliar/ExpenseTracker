import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };
    loadExpenses();
  }, []);

  const addExpense = async () => {
    if (!name || !category || !date || !amount) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      name,
      category,
      date,
      amount: parseFloat(amount),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);

    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }

    setName('');
    setCategory('');
    setDate('');
    setAmount('');
  };

  const deleteExpense = async (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);

    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const totalExpenditure = expenses.reduce(
    (total, item) => total + (typeof item.amount === 'number' ? item.amount : 0),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Expense Name"
          placeholderTextColor="#a78650"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (in ₹)"
          placeholderTextColor="#a78650"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          placeholderTextColor="#a78650"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor="#a78650"
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>Add Expense +</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Your Expenses</Text>
      <Text style={styles.totalText}>
        Total Expenditure: ₹{(isNaN(totalExpenditure) ? 0 : totalExpenditure).toFixed(2)}
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseName}>{item.name}</Text>
              <Text style={styles.expenseDetails}>
                ₹{(typeof item.amount === 'number' ? item.amount : 0).toFixed(2)}
              </Text>
          
            </View>
            <TouchableOpacity onPress={() => deleteExpense(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.navigationBtnContainer}>
        <Button
          title="View Your Expenses"
          color="#edd593"
          onPress={() => navigation.navigate('ViewExpenses')}
        />
      </View>
    </View>
  );
};

export default AddExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9f1',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8b5e34',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: '#f2e0ae',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fffaf0',
    borderColor: '#edd593',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#5a4635',
  },
  addButton: {
    backgroundColor: '#edd593',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4635',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b5e34',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a4635',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  expenseItem: {
    backgroundColor: '#fffaf0',
    borderColor: '#edd593',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4635',
  },
  expenseDetails: {
    fontSize: 14,
    color: '#5a4635',
  },
  deleteButton: {
    color: '#b22222',
    fontWeight: 'bold',
  },
  navigationBtnContainer: {
    marginTop: 20,
  },
});
