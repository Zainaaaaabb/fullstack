import { giveVote } from '../reducers/anecdoteReducer'
import { useSelector } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

// export default function AnecdoteList({ dispatch, anecdotes }) {
export default function AnecdoteList({ dispatch }) {

    const vote = (id, content) => {
        dispatch(giveVote(id))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    const anecdotes = useSelector(state => {
        // return state.filter === 'ALL' ? state.anecdotes.sort((a, b) => b.votes - a.votes) : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        return state.filter === 'ALL' ? [...state.anecdotes].sort((a, b) => b.votes - a.votes) : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
            .includes(state.filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    })


    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        {/* <button onClick={() => vote(anecdote.id)}>vote</button> */}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}