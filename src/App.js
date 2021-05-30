import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./privateRoute/PrivateRoute";
import FormMovie from "./pages/formMovie/FormMovie";
import FormCharacter from "./pages/formCharacter/FormCharacter";
import FormBook from "./pages/formBook/FormBook";
// import { ReactQueryDevtools } from "react-query/devtools";

const Login = React.lazy(() => import("./pages/login/Login"));
const Register = React.lazy(() => import("./pages/register/Register"));
const Characters = React.lazy(() => import("./pages/characters/Characters"));
const Movies = React.lazy(() => import("./pages/movies/Movies"));
const Books = React.lazy(() => import("./pages/books/Books"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <div>
        <Switch>
          <PrivateRoute
            path={["/", "/login"]}
            exact
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            )}
          />
          <PrivateRoute
            path="/register"
            exact
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            )}
          />
          <PrivateRoute
            path="/characters"
            exact
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Characters />
              </Suspense>
            )}
            isPrivate
          />
          <PrivateRoute
            path="/movies"
            exact
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Movies />
              </Suspense>
            )}
            isPrivate
          />
          <PrivateRoute
            path="/books"
            exact
            component={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Books />
              </Suspense>
            )}
            isPrivate
          />
          <PrivateRoute
            path="/formMovie"
            exact
            component={FormMovie}
            isPrivate
          />
          <PrivateRoute
            path="/formCharacter"
            exact
            component={FormCharacter}
            isPrivate
          />
          <PrivateRoute path="/formBook" exact component={FormBook} isPrivate />
        </Switch>
      </div>
    </QueryClientProvider>
  );
}

export default App;
