import { Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Characters from "./pages/characters/Characters";
import Movies from "./pages/movies/Movies";
import Books from "./pages/books/Books";
import FormMovie from "./pages/formMovie/FormMovie";
import FormCharacter from "./pages/formCharacter/FormCharacter";
import FormBook from "./pages/formBook/FormBook";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <Switch>
          <PrivateRoute path={["/", "/login"]} exact component={Login} />
          <PrivateRoute path="/register" exact component={Register} />
          <PrivateRoute
            path="/characters"
            exact
            component={Characters}
            isPrivate
          />
          <PrivateRoute path="/movies" exact component={Movies} isPrivate />
          <PrivateRoute path="/books" exact component={Books} isPrivate />
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
