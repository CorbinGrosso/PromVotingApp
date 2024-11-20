import VoteForm from './components/vote';
import NominationForm from './components/nominate';
import DisplayResults from './components/results';

function App() {

  function chooseContentsToDisplay() {

    // return <VoteForm />
    // return <DisplayResults />

    const currTime = new Date();

    // 18:00:00 is 6:00pm
    const votingStartTime = new Date(2024, 11, 7, 18, 0, 0)

    // 19:00:00 is 7:00pm
    const votingEndTime = new Date(2024, 11, 7, 19, 0, 0)


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
      <h1 className="text-center  font-bold text-2xl pt-8">Prom King and Queen</h1>
        {chooseContentsToDisplay()}
    </div>
  )
  
}

export default App;
