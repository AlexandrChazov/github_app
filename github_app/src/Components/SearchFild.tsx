import {useEffect, useState} from "react";

type PropsType = {
  searchString: string
  setSearchString: (searchString: string) => void
}

export const SearchField: React.FC<PropsType> = ({searchString, setSearchString}) => {

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(searchString)
  }, [searchString])

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={event => setInputValue(event.currentTarget.value)}/>
      <button
        onClick = {() => setSearchString(inputValue)}>
        Find
      </button>
    </div>
  )
}