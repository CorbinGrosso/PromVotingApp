import VoteForm from './components/vote';
import NominationForm from './components/nominate';
import DisplayResults from './components/results';

function App() {

  function chooseContentsToDisplay() {

    const currTime = new Date();
    // 18:00:00 is 6:00pm
    // const voteStartTime = new Date("12/7/2024 18:00:00")
    const votingStartTime = new Date("12/7/2024 18:00:00")

    // 19:00:00 is 7:00pm
    // const votingEndTime = new Date("12/7/2024 19:00:00")
    const votingEndTime = new Date("12/7/2024 19:00:00")


    // if voting hasn't begun, allow nominations
    if (currTime < votingStartTime) {

      return <NominationForm />

    // if voting has begun but hasn't ended, allow voting
    } else if (currTime < votingEndTime) {

      return <VoteForm />

    // if voting has ended, display results
    } else {

      return <DisplayResults />

    }
  }

  return (
    <div className="min-h-screen w-screen bg-zinc-900 text-yellow-400">
      <h1 className="text-center text-2xl pt-8">Prom King and Queen</h1>
        {chooseContentsToDisplay()}
    </div>
  )
  
}

export default App;
