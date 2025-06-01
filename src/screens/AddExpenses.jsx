import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // ⬅️ import this hook

const AddExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const navigation = useNavigation();  // ⬅️ initialize navigation

  const addExpense = () => {
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
    setExpenses([...expenses, newExpense]);
    setName('');
    setCategory('');
    setDate('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenditure = expenses.reduce((total, item) => total + item.amount, 0);

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
          placeholder="Date (e.g. 2025-06-01)"
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
        Total Expenditure: ₹{totalExpenditure.toFixed(2)}
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseName}>{item.name}</Text>
              <Text style={styles.expenseDetails}>
                ₹{item.amount.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deleteExpense(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Navigation Button */}
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
