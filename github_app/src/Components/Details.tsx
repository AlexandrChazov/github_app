import {UserType} from "../App";
import {useEffect, useState} from "react";
import {Preloader} from "./Preloader";

type DetailsPropsType = {
  userDetails: UserType | null
  seconds: number
  setSeconds: (x: (x: number) => number) => void
  isUserReceived: boolean
}

export const Details: React.FC<DetailsPropsType> = ({userDetails, seconds, setSeconds, isUserReceived}) => {

  if (userDetails && !isUserReceived) {
    return <Preloader/>
  }

  return (
    <div>
      {userDetails && <div>
        <Timer seconds={seconds}
               setSeconds={setSeconds}
               userDetails={userDetails}/>
        <h2>Details</h2>
        <img src={userDetails.avatar_url} alt="ava"/>
        <div>{userDetails.login}</div>
        <div>{userDetails.bio}</div>
      </div>}
    </div>
  )
}

type TimerPropsType = {
  seconds: number
  setSeconds: (x: (x: number) => number) => void
  userDetails: UserType
}

const Timer:React.FC<TimerPropsType> = ({seconds, setSeconds, userDetails}) => {

  useEffect(() => {
    const intervalID = setInterval(() => {
      setSeconds((x: number) => x - 1)
      console.log("setTimeout")
    }, 1000)
    return () => {
      clearInterval(intervalID)
    }
  }, [userDetails.id]) // зависим от ID пользователя чтобы при смене пользователя сбрасывался setInterval, иначе
                              // при смене пользователей десять секунд могут резко смениться на девять
  return (
    <div>
      {seconds}
    </div>
  )
}