import { toast } from 'react-toastify';

type IProperties = {
  mutate: any;
  variables: any;
  state: any;
  success?: string;
  onSuccess?: any;
  error?: string;
  onError?: any;
};

const Publish = async (properties: IProperties) => {
  const { mutate, variables, state, success, onSuccess, error, onError } =
    properties;
  const loading = toast.loading('Info Notification !', {
    position: toast.POSITION.TOP_RIGHT,
  });
  try {
    const data = await mutate({
      variables: {
        ...variables,
      },
    });
    toast.update(loading, {
      render: success,
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });
    onSuccess(data?.data || data);
  } catch (error: any) {
    //! We might need to implement Sentry
    // console.log({ error });
    // When application is in production mode then we will show default formal error message
    if (process.env.NODE_ENV === 'production') {
      toast.update(loading, {
        render: error || 'Error Happened',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      onError(error);
      return;
    }

    let errorMessages = [];
    /* 
      NETWORK ERROR:
      1. If there is graphql syntax problem or internet connection issue 
      2. If there is any internal server problem before going to the Apollo Server (ex: Database connection failed, Server start problem)
    */
    if (error?.networkError) {
      if (typeof window !== 'undefined' && !window?.navigator.onLine) {
        errorMessages = ["Sorry, Can't post. Your browser is offline."];
      } else {
        errorMessages =
          error?.networkError?.result?.errors.map(
            (netError: any) => `StatusCode - 400 | ${netError?.message}`,
          ) || [];
      }
    } else {
      /* 
        GRAPHQL ERROR:
        1. If error was thrown from the Apollo Server
        2. If error happen while resolving graphQL schema
      */
      errorMessages =
        error?.graphQLErrors?.map(
          (gqlError: any) => `StatusCode - 400 | ${gqlError?.message}`,
        ) || [];
    }
    errorMessages.forEach((msg: string, idx: number) => {
      if (idx === 0) {
        toast.update(loading, {
          render: () => <div dangerouslySetInnerHTML={{ __html: msg }} />,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000 + idx * 3000,
        });
      }
    });
  }
};

export default Publish;