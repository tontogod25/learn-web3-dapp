import {gql} from '@apollo/client';

const TEN_MOST_EXPENSIVE_PUNKS = gql`
  query {
    punks(first: 10, orderBy: value, orderDirection: desc) {
      id
      index
      owner {
        id
      }
      value
      date
    }
  }
`;

export default TEN_MOST_EXPENSIVE_PUNKS;
