import { gql } from 'apollo-boost'

export const ADAUGA_USER = gql`
  mutation Mutate($nume: String!, $prenume: String!, $judet: String!, $oras: String!, $adresa: String!, $data_nasterii: Date!, $email: String!, $parola: String!) {
    adauga_user(
        nume: $nume,
        prenume: $prenume,
        judet: $judet,
        oras: $oras,
        adresa: $adresa,
        data_nasterii: $data_nasterii,
        email: $email,
        parola: $parola,
    ){
      id
      nume
      prenume
      judet
      oras
      adresa
      data_nasterii
      email
      parola
    }
  }
`

export const ADAUGA_RESTAURANT = gql`
  mutation Mutate($nume: String!, $judet: String!, $oras: String!, $adresa: String!) {
    adauga_restaurant(
        nume: $nume,
        judet: $judet,
        oras: $oras,
        adresa: $adresa,
    ){
      id
      nume
      judet
      oras
      adresa
    }
  }
`

export const GET_USER_INFO = gql`
	{
		users {
			id
			nume
			prenume
		}
	}
`

export const GET_RESTAURANTS = gql`
query Query($search_text: String) {
		restaurants (
      search_text: $search_text
    ){
			id
      nume
      oras
      judet
      adresa
		}
	}
`

export const GET_RESTAURANTS_REQUESTS = gql`
  {
    restaurantsRequests {
      id
      nume
      oras
      judet
      adresa
    }
  }
`

export const LOGIN = gql`
query Query($email: String!, $parola: String!) {
    login(
        email: $email,
        parola: $parola,
    ){
      email
    }
  }
`
