/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/svg/icons/arrow.svg';
import edit from '../../assets/images/svg/icons/edit.svg';
import trash from '../../assets/images/svg/icons/trash.svg';
import sad from '../../assets/images/svg/sad.svg';
import emptyBox from '../../assets/images/svg/empty-box.svg';
import magnifierQuestion from '../../assets/images/svg/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm)
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contact deleted with success!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Error to deleted contact!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <Container>
      <Loader
        isLoading={isLoading}
      />

      <Modal
        isLoading={isLoadingDelete}
        danger
        visible={isDeleteModalVisible}
        title={`Are you sure you want to remove the contact "${contactBeingDeleted?.name}" ?`}
        confirmLabel="Delete"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>This action cannot be undone!</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Search contact"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contact' : ' contacts'}
          </strong>
        )}
        <Link to="/new">New Contact</Link>
      </Header>

      {
        hasError && (
          <ErrorContainer>
            <img
              src={sad}
              alt="sad smile because of an error that occurred"
            />
            <div className="details">
              <strong>There was an error getting your contacts!</strong>
              <Button type="button" onClick={handleTryAgain}>
                Try again
              </Button>
            </div>
          </ErrorContainer>
        )
      }

      {
        !hasError && (
          <>
            {(contacts.length < 1 && !isLoading) && (
              <EmptyListContainer>
                <img
                  src={emptyBox}
                  alt="empty box because there are no contacts"
                />

                <p>
                  You don't have any contact created yet!
                  {' '}
                  <br />
                  Click on the
                  {' '}
                  <strong>"new contact"</strong>
                  {' '}
                  button at the top to create a contact.
                </p>
              </EmptyListContainer>
            )}

            {(contacts.length > 0 && filteredContacts.length < 1) && (
              <SearchNotFoundContainer>
                <img
                  src={magnifierQuestion}
                  alt="magnifying glass for result not found"
                />

                <span>
                  No results found for
                  {' '}
                  <strong>{searchTerm}</strong>
                </span>
              </SearchNotFoundContainer>
            )}

            {filteredContacts.length > 0
              && (
                <ListHeader orderBy={orderBy}>
                  <button type="button" onClick={handleToggleOrderBy}>
                    <span>Name</span>
                    <img src={arrow} alt="ordernation button" />
                  </button>
                </ListHeader>
              )}

            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <div className="info">
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category.name && (
                      <small>{contact.category.name}</small>
                    )}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>

                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="edit contact" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    <img src={trash} alt="delete contact" />
                  </button>
                </div>
              </Card>
            ))}
          </>
        )
      }
    </Container>
  );
}
