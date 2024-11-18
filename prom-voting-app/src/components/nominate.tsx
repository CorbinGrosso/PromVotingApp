export default function NominationForm() {

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
        
    const formData = new FormData(e.currentTarget);
    const kingNominee = formData.get('king')?.toString().toLowerCase() || '';
    const queenNominee = formData.get('queen')?.toString().toLowerCase() || '';

    // Check if at least one field is filled
    if (!kingNominee && !queenNominee) {
      alert('Please nominate at least one candidate');
      return;
    }

    // Only process non-empty values
    if (kingNominee) {
      // Check if king nominee already exists in DB
      // TODO: Add DB check here
      console.log('Nominating for king:', kingNominee);
    }

    if (queenNominee) {
      // Check if queen nominee already exists in DB  
      // TODO: Add DB check here
      console.log('Nominating for queen:', queenNominee);
    }

    // Reset form
    e.currentTarget.reset();
  }

  return (
    <div>
      <h2 className="text-center text-xl pt-4">
        Nominations
      </h2>
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