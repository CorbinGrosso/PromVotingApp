import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const getKingMaxVotes = async (): Promise<number> => {
  const { data } = await supabase
    .from('KingVotes')
    .select('votes')
    .order('votes', { ascending: false })
    .limit(1);
  return data?.[0]?.votes || 0;
}

const getKings = async (): Promise<string[]> => {
  try {

    // Get the highest vote count
    const maxVotes = await getKingMaxVotes()

    // Get all nominees with the highest count (handles ties)
    const { data, error } = await supabase
      .from('KingVotes')
      .select('nominee')
      .eq('votes', maxVotes)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      throw error;
    }

    const nominees = data?.map(item => item.nominee) || [data[0].nominee];
    return nominees;
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return [];
  }
};

const getQueenMaxVotes = async (): Promise<number> => {
  const { data } = await supabase
    .from('QueenVotes')
    .select('votes')
    .order('votes', { ascending: false })
    .limit(1);
  return data?.[0]?.votes || 0;
}

const getQueens = async (): Promise<string[]> => {
  try {

    // Get the highest vote count
    const maxVotes = await getQueenMaxVotes()

    // Get all nominees with the highest count (handles ties)
    const { data, error } = await supabase
      .from('QueenVotes')
      .select('nominee')
      .eq('votes', maxVotes)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      throw error;
    }

    const nominees = data?.map(item => item.nominee) || [data[0].nominee];
    return nominees;
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return [];
  }
};

export default function DisplayResults() {

  const [kings, setKings] = useState<string[]>([]);
  const [queens, setQueens] = useState<string[]>([]);
  const [kingMaxVotes, setKingMaxVotes] = useState<number>(0);
  const [queenMaxVotes, setQueenMaxVotes] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const result = await getKingMaxVotes();
      setKingMaxVotes(result);
    }
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const result = await getQueenMaxVotes();
      setQueenMaxVotes(result);
    }
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const result = await getKings();
      setKings(result);
    }
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const result = await getQueens();
      setQueens(result);
    }
    getData();
  }, []);

  return (
    <div>
      <h2 className="text-center text-xl pt-4 font-bold">
        Winners
      </h2>
      <div className="flex justify-center gap-16 mt-8">
        <div className="w-[40%] px-[5%] flex flex-col items-center">
          <h3 className="text-base font-semibold mb-2">Prom King</h3>
          <h3 className="text-sm mb-4">Votes: {kingMaxVotes}</h3>
          <ul className="text-sm w-full">
            {kings.map((nominee, index) => (
              <li key={index} className="break-words">{nominee}</li>
            ))}
          </ul>
        </div>

        <div className="w-[40%] px-[5%] flex flex-col items-center">
          <h3 className="text-base font-semibold mb-2">Prom Queen</h3>
          <h3 className="text-sm mb-4">Votes: {queenMaxVotes}</h3>
          <ul className="text-sm w-full">
            {queens.map((nominee, index) => (
              <li key={index} className="break-words">{nominee}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}