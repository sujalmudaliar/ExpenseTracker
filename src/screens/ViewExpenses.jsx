import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses) {
        const allExpenses = JSON.parse(storedExpenses);
        const today = new Date();
        const currentMonth = today.getMonth(); // 0-indexed: Jan=0
        const currentYear = today.getFullYear();

        const filteredExpenses = allExpenses.filter((expense) => {
          const [year, month, day] = expense.date.split('-').map(Number);
          // Note: month - 1 since JavaScript Date months are 0-indexed
          const expenseDate = new Date(year, month - 1, day);
          return (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
          );
        });

        setExpenses(filteredExpenses);
      }
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>This Month's Expenses</Text>
      {expenses.length === 0 ? (
        <Text style={styles.noExpenses}>No expenses added this month.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseName}>{item.name}</Text>
              <Text style={styles.expenseDetails}>
                Category: {item.category}
              </Text>
              <Text style={styles.expenseDetails}>
                Amount: ₹{item.amount.toFixed(2)}
              </Text>
              <Text style={styles.expenseDetails}>
                Date: {item.date}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ViewExpenses;

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
  noExpenses: {
    fontSize: 16,
    color: '#5a4635',
    textAlign: 'center',
    marginTop: 20,
  },
  expenseItem: {
    backgroundColor: '#fffaf0',
    borderColor: '#edd593',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a4635',
    marginBottom: 4,
  },
  expenseDetails: {
    fontSize: 14,
    color: '#5a4635',
  },
});
