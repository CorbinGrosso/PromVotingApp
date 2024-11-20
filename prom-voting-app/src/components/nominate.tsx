import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const getKingNominees = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('KingVotes')
      .select('nominee')
      .order('created_at', { ascending: true });

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

const addKingNominee = async (nominee: string) => {
  try {
    const { error } = await supabase
      .from('KingVotes')
      .insert({ nominee, created_at: new Date() });

    if (error) {
      console.error(error);
      throw error;
    }
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
  }
};

const getQueenNominees = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('QueenVotes')
      .select('nominee')
      .order('created_at', { ascending: true });

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

const addQueenNominee = async (nominee:string) => {
  try {
    const { error } = await supabase
      .from('QueenVotes')
      .insert({ nominee, created_at: new Date() });

    if (error) {
      console.error(error);
      throw error;
    }
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
  }
};

export default function NominationForm() {

  const [kingNominees, setKingNominees] = useState<string[]>([]);
  const [queenNominees, setQueenNominees] = useState<string[]>([]);
  const [showNominees, setShowNominees] = useState(false);

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
    const kingNominee = formData.get('king')?.toString() || '';
    const queenNominee = formData.get('queen')?.toString() || '';

    // Check if at least one field is filled
    if (!kingNominee && !queenNominee) {
      alert('Please nominate at least one candidate');
      return;
    }

    // Only process non-empty values
    if (kingNominee) {
      if (!kingNominees.includes(kingNominee)) {
        addKingNominee(kingNominee);
        setKingNominees([...kingNominees, kingNominee]);
      }
    }

    if (queenNominee) {
        if (!queenNominees.includes(queenNominee)) {
          addQueenNominee(queenNominee)
          setQueenNominees([...queenNominees, queenNominee]);
      }
    }

    // Reset form
    e.currentTarget.reset();
  }

  return (
    <div>
      <h2 className="text-center text-xl pt-4 font-bold">
        Nominations
      </h2>
      <h3 className="text-center italic text-lg pt-4">
        Nominations End and Voting Begins at 6:00pm
      </h3>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowNominees(!showNominees)}
          className="px-6 py-2 bg-yellow-400 text-zinc-900 rounded hover:bg-yellow-300"
        >
          {showNominees ? 'Hide Current Nominees' : 'View Current Nominees'}
        </button>
      </div>
      {showNominees && (
        <div className="flex justify-center gap-16 mt-8">
          <div className="w-[40%] px-[5%] flex flex-col items-center">
            <h3 className="text-base font-semibold mb-4">Prom King Nominees</h3>
            <ul className="text-sm w-full">
              {kingNominees.map((nominee, index) => (
                <li key={index} className="break-words">{nominee}</li>
              ))}
            </ul>
          </div>

          <div className="w-[40%] px-[5%] flex flex-col items-center">
            <h3 className="text-base font-semibold mb-4">Prom Queen Nominees</h3>
            <ul className="text-sm w-full">
              {queenNominees.map((nominee, index) => (
                <li key={index} className="break-words">{nominee}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <form className="flex flex-col items-center gap-4 mt-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="king" className="text-lg">Prom King</label>
          <input 
            type="text"
            id="king"
            name="king"
            className="px-4 py-2 rounded bg-zinc-800 text-yellow-400 border border-yellow-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="queen" className="text-lg">Prom Queen</label>
          <input
            type="text" 
            id="queen"
            name="queen"
            className="px-4 py-2 rounded bg-zinc-800 text-yellow-400 border border-yellow-400"
          />
        </div>

        <button 
          type="submit"
          className="mt-4 px-8 py-2 bg-yellow-400 text-zinc-900 rounded hover:bg-yellow-300"
        >
          Submit Nominations
        </button>
      </form>
    </div>
  )
}