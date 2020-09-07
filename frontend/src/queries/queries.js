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
  mutation Mutate($nume: String!, $judet: String!, $oras: String!, $adresa: String!, $mese: [table_input]!) {
    adauga_restaurant(
        nume: $nume,
        judet: $judet,
        oras: $oras,
        adresa: $adresa,
        mese: $mese,
    ){
      id
    }
  }
`

export const ADAUGA_REVIEW = gql`
  mutation Mutate($user_id: Int!, $restaurant_id: Int!, $message: String!, $stars: Int!) {
    adauga_review(
      user_id: $user_id,
      restaurant_id: $restaurant_id,
      message: $message,
      stars: $stars,
    ){
      user_id,
      restaurant_id,
      message,
      stars
    }
  }
`

export const ADAUGA_REZERVARE = gql`
  mutation Mutate($user_id: Int!, $restaurant_id: Int!, $data_si_ora: Date!, $durata_ore: Int!, $numere_mese: [Int]!) {
    adauga_rezervare(
      user_id: $user_id,
      restaurant_id: $restaurant_id,
      data_si_ora: $data_si_ora,
      durata_ore: $durata_ore,
      numere_mese: $numere_mese,
    ){
      user_id,
      restaurant_id,
      data_si_ora,
      durata_ore,
      numere_mese
    }
  }
`

export const CONFIRM_RESTAURANT = gql`
  mutation Mutate($id: Int!, $nume: String!, $judet: String!, $oras: String!, $adresa: String!, $mese: [table_input]!) {
    confirm_restaurant(
        id: $id,
        nume: $nume,
        judet: $judet,
        oras: $oras, 
        adresa: $adresa,
        mese: $mese,
    ){
      id
      nume
      judet
      oras
      adresa
      specific
      mese {
        id
        selected
        numar_locuri
      }
    }
  }
`

export const RESPINGE_RESTAURANT = gql`
  mutation Mutate($id: Int!) {
    respinge_restaurant(
        id: $id,
    ){
      id
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
query Query($search_text: String, $judet: String, $user_id: Int) {
		restaurants (
      search_text: $search_text
      judet: $judet
      user_id: $user_id
    ){
			id
      nume
      oras
      judet
      adresa
      specific
      mese {
        id
        selected
      }
      imagini
		}
	}
`

export const GET_RECOMANDARI = gql`
query Query($recent_restaurants: [Int]!) {
		recomandari (
      recent_restaurants: $recent_restaurants
    ){
			id
      nume
      oras
      judet
      adresa
      specific
      imagini
		}
	}
`

export const GET_RESTAURANT = gql`
query Query($restaurant_id: Int!) {
  restaurant (
    restaurant_id: $restaurant_id
  ){
    id
    nume
    oras
    judet
    adresa
    specific
    mese {
      id
      selected
      numar_locuri
    }
    imagini
    reviews {
      restaurant_id
      user_id
      message
      stars
    }
    rezervari {
      restaurant_id
      user_id
      data_si_ora
      durata_ore
      numere_mese
    }
  }
}
`

export const GET_REVIEWS = gql`
query Query($restaurant_id: Int) {
		reviews (
      restaurant_id: $restaurant_id
    ){
      reviews {
        restaurant_id
        user_id
        message
        stars
      }
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
      specific
      mese {
        id
        selected
        numar_locuri
      }
    }
  }
`

export const LOGIN = gql`
query Query($email: String!, $parola: String!) {
    login(
        email: $email,
        parola: $parola,
    ){
      email,
      id
    }
  }
`
