import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useParams } from 'react-router-dom';
import {
  useGetEntityOnDemandMutation,
  useGetOneTimeSearchResultQuery,
} from '../../services/matching/MatchingApiSlice.ts';
import Loader from '../../common/Loader';
import DataTable from '../../components/DataTables/DataTable.tsx';
import EntityIdentityDisplay from '../../components/Display/Matching/EntityIdentityDisplay.tsx';
import EntityInformationDisplay
  from '../../components/Display/Matching/EntityInformationDisplay.tsx';
import React, { useEffect, useRef, useState } from 'react';

const natureOptions = [
  {
    value: 'NATURAL',
    label: 'Personne physique',
  },
  {
    value: 'LEGAL',
    label: 'Personne morale',
  },
  {
    value: 'VESSEL',
    label: 'Navire',
  },
];

const OneTimeSearchResult: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const {
    data: searchResult,
    isLoading,
    isError,
  } = useGetOneTimeSearchResultQuery(id);

  const [ getEntity ] = useGetEntityOnDemandMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (!modalOpen || modal.current.contains(target) || trigger.current.contains(target)) return;
      setModalOpen(false);
      setModalData(null);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
      setModalData(null);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const columns = (searchResult) => {
    if (searchResult.nature === 'NATURAL') {
      return [
        { Header: 'N° de Registre', accessor: 'registreId' },
        { Header: 'Nom', accessor: 'name' },
        { Header: 'Prénom', accessor: 'firstName' },
        { Header: 'Score', accessor: 'score' },
      ];
    }
    if (searchResult.nature === 'LEGAL') {
      return [
        { Header: 'N° de Registre', accessor: 'registreId' },
        { Header: 'Nom', accessor: 'name' },
        { Header: 'Score', accessor: 'score' },
      ];
    }
    if (searchResult.nature === 'VESSEL') {
      return [
        { Header: 'N° de Registre', accessor: 'registreId' },
        { Header: 'Nom', accessor: 'name' },
        { Header: 'Score', accessor: 'score' },
        { Header: 'N° OMI', accessor: 'omiNumber' },
      ];
    }

    return [
      { Header: 'N° de Registre', accessor: 'registreId' },
      { Header: 'Nom', accessor: 'name' },
      { Header: 'Score', accessor: 'score' },
    ];
  };

  const rows = (searchResults) => {
    return searchResults.map((result) => {
      return {
        registreId: result?._source?.registreId,
        name: result?._source?.name,
        firstName: result?._source?.natural?.firstName,
        score: result?._score,
        omiNumber: result?._source?.vessel?.OMINumber,
      };
    });
  };

  const dateFormater = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {});
  };

  const handleOnClick = async (row) => {
    const { data: entity } = await getEntity(row.registreId);
    setModalData(entity);
    setModalOpen(!modalOpen)
  };

  return isLoading ? (<Loader></Loader>) : isError ? (<div>Error</div>) : (
    <DefaultLayout>
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Résultat de la recherche - {searchResult?.name}
          </h3>
        </div>
        <div className="p-4 sm:p-6 xl:p-9">
          <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row xl:gap-9">
              <div>
                <div className="block">
                  <span
                    className="font-bold text-black dark:text-white">Référence: </span> {searchResult?.id}
                </div>
                <div className="mt-2 block">
                  <span className="font-bold text-black dark:text-white">Entité </span>
                  {natureOptions.find((option) => option.value === searchResult?.nature)?.label}
                </div>
              </div>
              <div className="ml-2.5">
                <div className="block">
                  <span
                    className="font-bold text-black dark:text-white">Date de la recherche: {' '} </span> {dateFormater(searchResult?.searchDate)}
                </div>
                <span className="mt-2 block">
                  <span
                    className="font-bold text-black dark:text-white">Hits total: </span> {searchResult?.totalResults}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <DataTable column={columns(searchResult)} rows={rows(searchResult.searchResult)}
                   handleOnClick={handleOnClick} />
      </div>
      <div
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          ref={modal}
          onFocus={() => setModalOpen(true)}
          onBlur={() => setModalOpen(false)}
          className="md:px-17.5 w-full max-w-5xl rounded-lg bg-white px-8 py-12 dark:bg-boxdark md:py-15"
        >
          <div className="text-center">
            <h3
              className="pb-2 text-center text-xl font-bold text-black dark:text-white sm:text-2xl">
              {modalData?.nature === 'NATURAL' ? `${modalData?.natural?.firstName} ${modalData?.name}` : modalData?.name}
            </h3>
            <span className="mx-auto mb-6 inline-block h-1 w-3/6 rounded bg-primary"></span>
          </div>
          <div className="overflow-y-auto max-h-150">
            <EntityIdentityDisplay entity={modalData} />
            <div className="text-center">
              <span className="mx-auto mb-6 mt-6 inline-block h-1 w-3/6 rounded bg-primary"></span>
            </div>
            <div className="overflow-y-auto h-1/2">
              <EntityInformationDisplay entity={modalData} />
            </div>
          </div>
          <div className=" -mx-3 flex flex-wrap gap-y-4 mt-6">
            <div className="w-full px-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setModalData(null);
                }}
                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>);
};

export default OneTimeSearchResult;
