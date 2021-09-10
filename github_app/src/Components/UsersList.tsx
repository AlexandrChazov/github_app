import styles from "../App.module.css";
import {useEffect, useState} from "react";
import {UserType} from "../App";
import axios from "axios";
import {Preloader} from "./Preloader";

type PropsType = {
  searchString: string
  setUserDetails: (user: UserType) => void
  setSeconds: (x: number) => void
  setIsUserReceived: (x: boolean) => void
}

export const UsersList: React.FC<PropsType> = ({searchString, setUserDetails, setSeconds, setIsUserReceived}) => {

  const [users, setUsers] = useState<UserType[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isThereAreUsers, setIsThereAreUsers] = useState(false);

  useEffect(() => {
    setIsUserReceived(false);
    selectedUser && axios
      .get(`https://api.github.com/users/${selectedUser}`)
      .then((res) => {
        setUserDetails(res.data);
        setIsUserReceived(true)
      });
    setSeconds(10)
  }, [selectedUser])

  useEffect(() => {
    setIsThereAreUsers(false)
    axios
      .get(`https://api.github.com/search/users?q=${searchString}`)
      .then((res) => {
        setUsers(res.data.items)
        setIsThereAreUsers(true)
      })
  }, [searchString])

  return (
    <div>
      {
        isThereAreUsers
          ? <ul>
              {users.map((el, i) => {
                return <li
                  className={selectedUser === el.login ? styles.active : ""}
                  key={el.id}
                  onClick={() => {
                    setSelectedUser(el.login)
                  }}>
                  {el.login}
                </li>
              })}
            </ul>
          : <Preloader/>
      }
    </div>
  )
}