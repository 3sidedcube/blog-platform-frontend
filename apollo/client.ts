"use client"; 
import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function createApolloClient() {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/docs",
    cache: new InMemoryCache(),
  });
}
