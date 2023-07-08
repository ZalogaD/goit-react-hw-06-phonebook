import React, { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Cont, TitlePh, TitleCont } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, dltContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      dispatch(addContact(JSON.parse(savedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (newName, newNumber) => {
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === newName.toLowerCase()
    );

    if (isContactExists) {
      alert(
        `${newName} is already in contacts. Please enter a different name.`
      );
      return;
    }

    dispatch(addContact({ name: newName, number: newNumber }));
  };

  const deleteContactHandler = id => {
    dispatch(dltContact(id));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Cont>
      <TitlePh>Phonebook</TitlePh>
      <ContactForm addNewContact={addNewContact} contacts={contacts} />
      <TitleCont>Contacts:</TitleCont>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filterContacts}
        onDeleteContact={deleteContactHandler}
      />
    </Cont>
  );
};

export default App;
