import {useState} from "react";

type PropsType = {
  setSearchString: (searchString: string) => void
}

export const SearchField: React.FC<PropsType> = ({setSearchString}) => {

  const [inputValue, setInputalue] = useState('FireYourGuns')

  return (
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
  )
}