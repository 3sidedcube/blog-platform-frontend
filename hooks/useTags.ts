import {
    gql,
    useQuery as useApolloQuery,
    useMutation as useApolloMutation,
    useQuery,
  } from "@apollo/client";
  function getHeader() {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  const GET_TAGS = gql`
  query tags {
    tags {
        id
        name
      }
  }
`;
const GET_TAGS_WITH_COUNT = gql`
query getTagsWithPostCount{
getTagsWithPostCount{
 name
 postCount
}
}
`
export function useGetTags(){
    return useQuery(GET_TAGS)
}
export function useGetTagsWithPostCount(){
    return useQuery(GET_TAGS_WITH_COUNT, {
        context: {
          headers: getHeader(),
        },
      })
}