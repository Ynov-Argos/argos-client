const EntityIdentityDisplay = ({ entity }: { entity: any }) => {

  return (
    <div>
      Alias :
      <div className="pl-4">
        <ul className="flex flex-col">
          {entity?.aliases.map((alias, index) => (
            <li key={index} className="flex items-center gap-2.5">
                  <span
                    className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
              <span> {alias.data} </span>
            </li>
          ))}
        </ul>
      </div>
      {entity?.nature === 'NATURAL' ? (<>
        {entity?.natural.sex !== null ? (<> Sexe : {entity?.natural.sex ? 'Homme' : 'Femme'}
          <br /> </>) : (<></>)}
        {entity?.natural.birthDate.length > 0 ? (<>
          Dates de Naissance :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.natural.birthDate.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span> {data.day}/{data.month}/{data.year} </span>
                </li>
              ))}
            </ul>
          </div>
        </>) : (<></>)}
        {entity?.natural.birthPlace.length > 0 ? (<>
          Lieux de Naissance :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.natural.birthPlace.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span> {data.country} - {data.place} </span>
                </li>
              ))}
            </ul>
          </div>
        </>) : (<></>)}
        {entity?.natural.identityDocuments.length > 0 ? (<>
          Documents d'identité :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.natural.identityDocuments.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span> {data.comment} - {data.number} </span>
                </li>
              ))}
            </ul>
          </div>
        </>) : (<></>)}
        {entity?.natural.nationality.length > 0 ? (<>
          Nationalités :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.natural.nationality.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span> {data} </span>
                </li>
              ))}
            </ul>
          </div>
        </>) : (<></>)}
        {entity?.natural.addresses.length > 0 ? (<>
          Adresses :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.natural.addresses.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span> {data.place} - {data.country} - {data?.comment} </span>
                </li>
              ))}
            </ul>
          </div>
        </>) : (<></>)}
      </>) : (<></>)}
      {entity?.nature === 'LEGAL' ? (<>
        {entity?.legal.identification.length > 0 ? (<>
          Identifications :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.legal.identification.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span>{data?.comment} - {data.data}</span>
                </li>
              ))}
            </ul>
          </div> </>) : (<></>)}
        {entity?.legal.nationality.length > 0 ? (<>
          Nationalités :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.legal.nationality.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span> {data} </span>
                </li>
              ))}
            </ul>
          </div>
        </>) : (<></>)}
        {entity?.legal.addresses.length > 0 ? (<>
          Adresses :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.legal.addresses.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span> {data.place} - {data.country} - {data?.comment} </span>
                </li>
              ))}
            </ul>
          </div>
        </>) : (<></>)}
      </>) : (<></>)}
      {entity?.nature === 'VESSEL' ? (<>
        {entity?.vessel.identification.length > 0 ? (<>
          Identifications :
          <div className="pl-4">
            <ul className="flex flex-col">
              {entity?.vessel.identification.map((data, index) => (
                <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                  <span>{data?.comment} - {data.data}</span>
                </li>
              ))}
            </ul>
          </div> </>) : (<></>)}
      </>) : (<></>)}
    </div>
  );
};

export default EntityIdentityDisplay;
