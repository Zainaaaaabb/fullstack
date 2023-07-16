import { filterChange, filterRemove } from "../reducers/filterReducer"

const Filter = ({ dispatch }) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    if (event.target.value.length === 0) {
      dispatch(filterRemove())
    }
    dispatch(filterChange(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter