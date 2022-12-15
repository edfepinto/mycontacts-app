/* eslint-disable react/no-unescaped-entities */
import { Container } from './styles';

import emptyBox from '../../../../assets/images/svg/empty-box.svg';

export default function EmptyList() {
  return (
    <Container>
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
    </Container>
  );
}
