// import { useSelector, useDispatch } from 'react-redux'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  // const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter dispatch={dispatch} />
      <AnecdoteList dispatch={dispatch} />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  )
}

export default App