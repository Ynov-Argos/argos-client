const EntityInformationDisplay = ({ entity }: { entity: any }) => {

  return (<div>
    {entity?.motifs !== "" ? (<> Motifs : {entity?.motifs} <br/> </>) : (<></>)}
    {entity?.juridicalBasis.length > 0 ? (<>
      Base Juridique :
      <div className="pl-4">
        <ul className="flex flex-col">
          {entity?.juridicalBasis.map((data, index) => (
            <li key={index} className="flex items-center gap-2.5">
                          <span
                            className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
              <span> {data} </span>
            </li>
          ))}
        </ul>
      </div>
    </>) : (<></>)}
  </div>)
};

export default EntityInformationDisplay;
