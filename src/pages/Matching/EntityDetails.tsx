import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { Link, useParams } from 'react-router-dom';
import { useGetEntityQuery } from '../../services/matching/MatchingApiSlice.ts';
import Loader from '../../common/Loader';
import { useState } from 'react';

const EntityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  const {
    data: entity,
    isLoading,
  } = useGetEntityQuery(id);

  return isLoading ? (<Loader></Loader>) : (<>
    <DefaultLayout>
      <div>
        <div
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Entité
              n°{entity.registreId} - {entity.name} {entity.EUReference ? `- ${entity.EUReference}` : ''} {entity.UNReference ? `- ${entity.UNReference}` : ''}
            </h3>
          </div>
          <div className="p-4 sm:p-6 xl:p-9">
            <div
              className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
              <Link
                to="#"
                className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                  openTab === 1 ? activeClasses : inactiveClasses
                }`}
                onClick={() => setOpenTab(1)}
              >
                Identité
              </Link>
              <Link
                to="#"
                className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                  openTab === 2 ? activeClasses : inactiveClasses
                }`}
                onClick={() => setOpenTab(2)}
              >
                Motifs & Base Juridique
              </Link>
            </div>

            <div>
              <div
                className={`leading-relaxed ${openTab === 1 ? 'block' : 'hidden'}`}
              >
                {entity.nature === 'NATURAL' && entity?.natural?.title !==  "" ? (<> Titre : {entity?.natural?.title} <br/> </>) : (<></>)}
                {entity.nature === 'VESSEL' && entity?.vessel?.OMINumber !==  "" ? (<> Numéro OMI : {entity?.vessel?.OMINumber} <br/> </>) : (<></>)}
                Nom : {entity?.natural?.firstName} {entity.name} <br/>
                Aliases :
                <div className="pl-4">
                  <ul className="flex flex-col">
                    {entity.aliases.map((alias, index) => (
                      <li key={index} className="flex items-center gap-2.5">
                        <span  className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                        <span> {alias.data} </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {entity.nature === 'NATURAL' ? (<>
                    {entity.natural.sex !== null ? (<> Sexe : {entity.natural.sex ? 'Homme' : 'Femme'} <br/> </>) : (<></>)}
                    {entity.natural.birthDate.length > 0 ? (<>
                      Dates de Naissance :
                      <div className="pl-4">
                        <ul className="flex flex-col">
                          {entity.natural.birthDate.map((data, index) => (
                            <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                              <span> {data.day}/{data.month}/{data.year} </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>) : (<></>)}
                    {entity.natural.birthPlace.length > 0 ? (<>
                      Lieu de Naissance :
                      <div className="pl-4">
                        <ul className="flex flex-col">
                          {entity.natural.birthPlace.map((data, index) => (
                            <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                              <span> {data.country} - {data.place} </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>) : (<></>)}
                    {entity.natural.identityDocuments.length > 0 ? (<>
                      Documents d'identité :
                      <div className="pl-4">
                        <ul className="flex flex-col">
                          {entity.natural.identityDocuments.map((data, index) => (
                            <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                              <span> {data.comment} - {data.number} </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>) : (<></>)}
                    {entity.natural.nationality.length > 0 ? (<>
                      Nationalités :
                      <div className="pl-4">
                        <ul className="flex flex-col">
                          {entity.natural.nationality.map((data, index) => (
                            <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                              <span> {data} </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>) : (<></>)}
                    {entity.natural.addresses.length > 0 ? (<>
                      Adresses :
                      <div className="pl-4">
                        <ul className="flex flex-col">
                          {entity.natural.addresses.map((data, index) => (
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
                {entity.nature === 'LEGAL' ? (<>
                  {entity.legal.identification.length > 0 ? (<>
                    Identifications :
                    <div className="pl-4">
                      <ul className="flex flex-col">
                        {entity.legal.identification.map((data, index) => (
                          <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                            <span>{data?.comment} - {data.data}</span>
                          </li>
                        ))}
                      </ul>
                    </div> </>) : (<></>)}
                  {entity.legal.nationality.length > 0 ? (<>
                    Nationalités :
                    <div className="pl-4">
                      <ul className="flex flex-col">
                        {entity.legal.nationality.map((data, index) => (
                          <li key={index} className="flex items-center gap-2.5">
                            <span
                              className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                            <span> {data} </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>) : (<></>)}
                  {entity.legal.addresses.length > 0 ? (<>
                    Adresses :
                    <div className="pl-4">
                      <ul className="flex flex-col">
                        {entity.legal.addresses.map((data, index) => (
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
                {entity.nature === 'VESSEL' ? (<>
                  {entity.vessel.identification.length > 0 ? (<>
                    Identifications :
                    <div className="pl-4">
                      <ul className="flex flex-col">
                        {entity.vessel.identification.map((data, index) => (
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
              <div
                className={`leading-relaxed ${openTab === 2 ? 'block' : 'hidden'}`}
              >
                {entity.motifs !== "" ? (<> Motifs : {entity.motifs} <br/> </>) : (<></>)}
                {entity.juridicalBasis.length > 0 ? (<>
                  Base Juridique :
                  <div className="pl-4">
                    <ul className="flex flex-col">
                      {entity.juridicalBasis.map((data, index) => (
                        <li key={index} className="flex items-center gap-2.5">
                          <span
                            className="max-w-2 flex h-2 w-full items-center justify-center rounded-full bg-primary text-white"> {}</span>
                          <span> {data} </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>) : (<></>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  </>);
};

export default EntityDetails;
