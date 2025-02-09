"use client"; 

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/apollo/client";

export default function ApolloProviderWrapper({ children }: { children: ReactNode }) {
  const client = createApolloClient(); 

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
