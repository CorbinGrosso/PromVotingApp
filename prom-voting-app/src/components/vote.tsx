import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const getKingNominees = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('KingVotes')
      .select('nominee');

    if (error) {
      console.error(error);
      throw error;
    }

    const nominees = data.map(item => item.nominee);
    return nominees;
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return [];
  }
};

const incrementKingVote = async (nominee: string) => {
  await supabase
  .rpc('increment_vote', { nominee, table_name: 'KingVotes' });
}

const getQueenNominees = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('QueenVotes')
      .select('nominee');

    if (error) {
      console.error(error);
      throw error;
    }

    const nominees = data.map(item => item.nominee);
    return nominees;
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return [];
  }
};

const incrementQueenVote = async (nominee: string) => {
  await supabase
  .rpc('increment_vote', { nominee, table_name: 'QueenVotes' });
}

export default function VoteForm() {

  const [kingNominees, setKingNominees] = useState<string[]>([]);
  const [queenNominees, setQueenNominees] = useState<string[]>([]);
  const [isVoting, setIsVoting] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getKingNominees();
      setKingNominees(result);
    }
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const result = await getQueenNominees();
      setQueenNominees(result);
    }
    getData();
  }, []);
  
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const kingVote = formData.get('king');
    const queenVote = formData.get('queen');

    incrementKingVote(kingVote as string);
    incrementQueenVote(queenVote as string);

    setIsVoting(false);

  }
  
  return (
    <div>
      {isVoting && <div>
        <h2 className="text-center text-xl pt-4 font-bold">
          Cast Your Vote
        </h2>
        <h3 className="text-center font-italic text-lg pt-4">
          Voting ends at 7:00pm
        </h3>
        <form className="flex flex-col items-center gap-8 mt-8" onSubmit={onSubmit}>
          <div className="w-[80%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Prom King</h3>
            <div className="flex flex-col gap-2">
              {kingNominees.map((nominee, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`king-${index}`}
                    name="king"
                    value={nominee}
                    className="text-yellow-400"
                  />
                  <label htmlFor={`king-${index}`}>{nominee}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[80%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Prom Queen</h3>
            <div className="flex flex-col gap-2">
              {queenNominees.map((nominee, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`queen-${index}`}
                    name="queen"
                    value={nominee}
                    className="text-yellow-400"
                  />
                  <label htmlFor={`queen-${index}`}>{nominee}</label>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="px-6 py-2 bg-yellow-400 text-zinc-900 rounded hover:bg-yellow-300"
          >
            Submit Vote
          </button>
        </form>
      </div>}

      {!isVoting && <div>
        <h2 className="text-center text-xl pt-8 font-bold">
          Thank You for Voting
        </h2>
        <h3 className="text-center font-italic text-lg pt-4">
          Results will be displayed at 7:00pm
        </h3>
        <h3 className="text-sm text-center mt-8 italic">
        Please don't vote again.
        </h3>
        <h3 className="text-sm text-center italic">
          Thank you.
        </h3>
      </div>}
    </div>
  )
}