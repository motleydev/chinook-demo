type Action = {
  name: string;
};

type Input = Record<string, never>;

type RequestQuery = string;

type SessionVariables = {
  "x-hasura-role"?: string;
  "x-hasura-user-id"?: string;
};

export type HasuraAction = {
  action: Action;
  input: Input;
  request_query: RequestQuery;
  session_variables: SessionVariables;
};
