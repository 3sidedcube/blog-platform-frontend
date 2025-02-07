import {
  gql,
  useQuery as useApolloQuery,
  useMutation as useApolloMutation,
} from "@apollo/client";
function getHeader() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      posts {
        id
        title
        content
        createdAt
        tags{
        id
        name
        }
      }
      total
    }
  }
`;
const GET_POST_BY_ID = gql`
  query getPostById($id: String!) {
    getPostById(id: $id) {
      id
      title
      content
      createdAt
      tags{
      id
      name
      }
    }
  }
`;
const CREATE_POST = gql`
  mutation CreatePost($request: CreatePost!) {
    createPost(request: $request) {
      message
    }
  }
`;
const GET_MY_POSTS = gql`
  query GetMyPosts {
    getMyPosts {
      posts {
        id
        title
        content
        createdAt
        tags{
        id
        name
        }
      }
      total
    }
  }
`;
const DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      message
    }
  }
`;
const UPDATE_POST = gql`
  mutation UpdatePost($request: UpdatePost!) {
    updatePost(request: $request) {
      message
    }
  }
`;

const ASSIGN_TAGS = gql`
  mutation AssignTags($data: AssignTagsInput!) {
    assignTags(data: $data)
  }
`;
const SEARCH_POSTS = gql`
  query SearchPosts($query: String) {
    searchPosts(query: $query) {
      posts {
      id
      title
      content
      tags
      {
        id
        name
      }
      }
      total
    }
  }
`;
export function useSearchPosts(query: string) {
  return useApolloQuery(SEARCH_POSTS, {
    variables: { query},
    skip: !query,
  });
}
export function useGetMyPosts() {
  return useApolloQuery(GET_MY_POSTS, {
    context: {
      headers: getHeader(),
    },
  });
}
export function useGetPostById(id: string) {
  return useApolloQuery(GET_POST_BY_ID, {
    variables: { id },
  });
}
export function useDeletePost() {
  return useApolloMutation(DELETE_POST, {
    context: {
      headers: getHeader(),
    },
  });
}
export function useUpdatePost() {
  return useApolloMutation(UPDATE_POST, {
    context: {
      headers: getHeader(),
    },
  });
}
export function useAssignTags() {
  return useApolloMutation(ASSIGN_TAGS, {
    context: {
      headers: getHeader(),
    },
  });
}
export function useGetAllPosts() {
  return useApolloQuery(GET_ALL_POSTS);
}

export function useCreatePost() {
  return useApolloMutation(CREATE_POST, {
    context: {
      headers: getHeader(),
    },
  });
}
