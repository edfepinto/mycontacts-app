import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/svg/icons/arrow.svg';
import edit from '../../assets/images/svg/icons/edit.svg';
import trash from '../../assets/images/svg/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log('Internal Server Error', error);
      });
  }, []);

  return (
    <Container>
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Search contact"
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contact' : ' contacts'}
        </strong>
        <Link to="/new">New Contact</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Name</span>
            <img src={arrow} alt="ordernation button" />
          </button>
        </header>

        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                  <small>{contact.category_name}</small>
                )}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="edit contact" />
              </Link>
              <button type="button">
                <img src={trash} alt="delete contact" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
}
