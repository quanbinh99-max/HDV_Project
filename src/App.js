import "./App.css";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import Admin from "./components/Admin/index";
import Login from "./components/login/index";
function App() {
  return (
    <RecoilRoot>
      <div className="App">
        {/* <Login></Login> */}
        <Admin></Admin>
      </div>
    </RecoilRoot>
  );
}
export default App;
