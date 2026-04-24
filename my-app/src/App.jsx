import BgColor from "./bgcolor";
import DrinkSummary from "./DrinkSummary";
import Quiz from "./quiz";
import UrlProvider from './UrlProvider';

const App = () => {
  return (
    <UrlProvider>
    <div>
      <h1>...</h1>
      <BgColor />
      {/* <DrinkSummary /> */}
      {/*<Quiz />*/}
    </div>
    </UrlProvider>
  );
};

export default App;