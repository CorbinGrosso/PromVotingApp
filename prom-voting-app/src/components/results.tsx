import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const getKings = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('KingVotes')
      .select('nominee, votes')
      .order('votes', { ascending: false })
      .limit(1);

    // Get the highest vote count
    const maxVotes = data?.[0]?.votes;

    // Get all nominees with the highest count (handles ties)
    const { data: tiedData } = await supabase
      .from('KingVotes')
      .select('nominee')
      .eq('votes', maxVotes)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      throw error;
    }

    const nominees = tiedData?.map(item => item.nominee) || [data[0].nominee];
    return nominees;
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return [];
  }
};

const getQueens = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('QueenVotes')
      .select('nominee, votes')
      .order('votes', { ascending: false })
      .limit(1);

    // Get the highest vote count
    const maxVotes = data?.[0]?.votes;

    // Get all nominees with the highest count (handles ties)
    const { data: tiedData } = await supabase
      .from('QueenVotes')
      .select('nominee')
      .eq('votes', maxVotes)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      throw error;
    }

    const nominees = tiedData?.map(item => item.nominee) || [data[0].nominee];
    return nominees;
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return [];
  }
};

export default function DisplayResults() {

  const [kings, setKings] = useState<string[]>([]);
  const [queens, setQueens] = useState<string[]>([]);

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
          <h3 className="text-base font-semibold mb-4">Prom King</h3>
          <ul className="text-sm w-full">
            {kings.map((nominee, index) => (
              <li key={index} className="break-words">{nominee}</li>
            ))}
          </ul>
        </div>

        <div className="w-[40%] px-[5%] flex flex-col items-center">
          <h3 className="text-base font-semibold mb-4">Prom Queen</h3>
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