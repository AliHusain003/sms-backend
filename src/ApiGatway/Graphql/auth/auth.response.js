import { gql } from 'apollo-server-express';

export const AuthResponse = gql`
    type AuthResponse {
        status: String!
        message: String!
        data: AuthPayload
    } 
`