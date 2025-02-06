"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { gql, useQuery as useApolloQuery, useMutation as useApolloMutation } from "@apollo/client";
const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      posts {
        id
        title
        content
        createdAt
        tags
      }
      total
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      message
    }
  }
`;

export function useGetAllPosts() {
  return useApolloQuery(GET_ALL_POSTS);
}

export function useCreatePost() {
  return useApolloMutation(CREATE_POST);
}
