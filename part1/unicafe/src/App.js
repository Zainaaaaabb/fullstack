import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = 'Give Feedback'

  return (
    <div>
      <Header heading={feedback} />
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = ({ heading }) => <h1>{heading}</h1>
const Button = (props) => <button onClick={props.onClick}> {props.text} </button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad;
  const average = (((good * 1) + (neutral * 0) + (bad * -1)) / total).toFixed(2); // Good = 1, neutral = 0, bad = -1
  const positivePercent = `${((good / total) * 100).toFixed(2)} %`;

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positivePercent} />
          </tbody>
        </table>
      </div>
    );
  }
  else return <p>No feedback given</p>;
}

export default App


  // const total = good + bad + neutral

  // // const total = (good, neutral, bad) => {
  // //   return (
  // //     good + bad + neutral
  // //   )
  // // }

  // const positivePercentage = (good) => {
  //   console.log('Good is', good, 'and total is', total)
  //   const intermediate = good / total
  //   if (isNaN(intermediate))
  //     return 0
  //   return ((good / total) * 100 + ' %')
  // }

  // const average = (good, neutral, bad, total) => {
  //   // console.log('Good is', good, 'and total is', total)
  //   const intermediateAvg = ((good * 1) + (neutral * 0) + (bad * -1)) / total
  //   if (isNaN(intermediateAvg))
  //     return 0
  //   return (intermediateAvg)
  // }


  // positivePercentage = isNaN(positivePercentage) ? 0 : positivePercentage
  // positivePercentage = positivePercentage + '%'

  // const average = (good + neutral + bad) / total


  //const statistic = ['good', 'neutral', 'bad', 'all', 'average', 'positive']
  //const collectedFeedback = [good, neutral, bad, total, average(good, neutral, bad, total), positivePercentage(good)]


