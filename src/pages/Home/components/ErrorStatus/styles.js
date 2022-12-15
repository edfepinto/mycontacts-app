import styled from 'styled-components';

export const Container = styled.div`
margin-top: 16px;
display: flex;
align-items: center;

.details {
  margin-left: 24px;

  strong {
    font-size: 22px;
    color: ${({ theme }) => theme.colors.danger.main};
    display: block;
    margin-bottom: 8px;
  }
}
`;
