import styles from './App.module.css';
import {useEffect, useState} from "react";
import axios from 'axios';

type UserType = {
  login: string
  id: number
}

function App() {

  const [searchString, setSearchString] = useState("FireYourGuns")
  const [inputValue, setInputalue] = useState('FireYourGuns')
  const [users, setUsers] = useState<UserType[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get(`https://api.github.com/search/users?q=${searchString}`)
      .then(res => setUsers(res.data.items))
  }, [searchString])

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputalue(event.currentTarget.value)}/>
        <button
          onClick = {() => setSearchString(inputValue)}>
          Find
        </button>
      </div>
      <div>
        <ul>
          {users.map((el, i) => {
            return <li
              className = {selectedUser === el.login? styles.active : ""}
              key={el.id}
              onClick={() => {setSelectedUser(el.login)}}>
              {el.login}
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
