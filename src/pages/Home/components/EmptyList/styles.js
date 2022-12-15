import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
    margin-top: 16px;
    font-size: 1.125rem;
    line-height: 1.5;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
