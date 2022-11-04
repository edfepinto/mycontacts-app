/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */

import { Link } from 'react-router-dom';

import {
  Container,
  ListHeader,
  Card,
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
import InputSearch from './components/InputSearch';
import Header from './components/Header';

import useHome from './useHome';

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    filteredContacts,
    contactBeingDeleted,
    contacts,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleToggleOrderBy,
    handleDeleteContact,
    handleTryAgain,
    searchTerm,
    hasError,
    orderBy,
  } = useHome();

  return (
    <Container>
      <Loader
        isLoading={isLoading}
      />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

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
          </>
        )
      }
    </Container>
  );
}
