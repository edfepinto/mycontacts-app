import { Container, InputSearchContainer } from './styles';

import logo from '../../assets/images/svg/logo.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201" />

      <InputSearchContainer>
        <input
          type="text"
          placeholder="Search contact"
        />
      </InputSearchContainer>
    </Container>
  );
}
