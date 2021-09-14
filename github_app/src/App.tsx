import styles from './App.module.css';
import {useState} from "react";
import {Details} from "./Components/Details";
import {UsersList} from "./Components/UsersList";
import {SearchField} from "./Components/SearchFild";

const initialSearchValue = "Fire"

export type UserType = {
  login: string
  id: number
  avatar_url: string
  bio: string
}

const App = () => {

  const [searchString, setSearchString] = useState(initialSearchValue)
  const [userDetails, setUserDetails] = useState<UserType | null>(null)
  const [seconds, setSeconds] = useState<number>(10);
  const [isUserReceived, setIsUserReceived] = useState(false);

  return (
    <div>
      <SearchField searchString={searchString}
                   setSearchString={setSearchString}/>
      <button onClick={() => setSearchString(initialSearchValue)}>Reset</button>
      <div className={styles.usersWrapper}>
        <UsersList searchString={searchString}
                   setUserDetails={setUserDetails}
                   setIsUserReceived={setIsUserReceived}
                   setSeconds={setSeconds}/>
        {
          seconds >= 1
            ? <Details userDetails={userDetails}
                       seconds={seconds}
                       isUserReceived={isUserReceived}
                       setSeconds={setSeconds}/>
            : null
        }
      </div>
    </div>
  );
}

export default App;
