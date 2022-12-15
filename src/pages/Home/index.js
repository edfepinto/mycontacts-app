import { Container } from './styles';

import Loader from '../../components/Loader';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

import useHome from './useHome';

export default function Home() {
  const {
    contacts,
    contactBeingDeleted,
    filteredContacts,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    handleChangeSearchTerm,
    handleTryAgain,
    handleToggleOrderBy,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    searchTerm,
    hasError,
    orderBy,
  } = useHome();

  const hasContacts = !hasError && contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
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

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {(isSearchEmpty) && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Are you sure you want to remove the contact "${contactBeingDeleted?.name}" ?`}
            confirmLabel="Delete"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>This action cannot be undone!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
