"use client";
import { gql, useQuery as useApolloQuery, useMutation as useApolloMutation } from "@apollo/client";
const LOGIN_MUTATION = gql`
  mutation loginuser($email: String!, $password: String!) {
    login(request: { email: $email, password: $password }) {
      access_token
    }
  }
`;
export function useLogin() {
  return useApolloMutation(LOGIN_MUTATION);
}
const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      message
    }
  }
`;

export function useRegister() {
  return useApolloMutation(REGISTER_MUTATION);
}