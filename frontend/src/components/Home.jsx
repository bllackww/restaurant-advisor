import React from "react"
import { graphql } from "react-apollo"
import { GET_USER_INFO } from "../queries/queries";

const Users = props => {
    return (
        <div>
            <h3>Graph List</h3><br />
            <ol>
                {props.data?.users?.map(p => (
                    <li key={p.id}><a>{p.nume} {p.prenume}</a></li>
                ))}
            </ol>
        </div>
    )
}
export default graphql(GET_USER_INFO)(Users);