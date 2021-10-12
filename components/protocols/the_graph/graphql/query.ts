import {gql} from '@apollo/client';

const TEN_MOST_EXPENSIVE_PUNKS = gql`
  query {
    punks {
      id
    }
  }
`;

export default TEN_MOST_EXPENSIVE_PUNKS;
