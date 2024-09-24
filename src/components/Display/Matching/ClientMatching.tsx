import React, { useEffect, useRef, useState } from 'react';
import {
  useGetEntityOnDemandMutation,
  useGetMatchingWorkflowByClientQuery, useSetMatchQualificationMutation,
} from '../../../services/matching/MatchingApiSlice.ts';
import Loader from '../../../common/Loader';
import ClientMatchingDataTable from '../../DataTables/ClientMatchingDataTable.tsx';
import moment from 'moment';
import EntityIdentityDisplay from './EntityIdentityDisplay.tsx';
import EntityInformationDisplay from './EntityInformationDisplay.tsx';

type ClientMatchingProps = { clientID: string; };

const columns = [
  { Header: 'Nom', accessor: 'name' },
  { Header: 'Date de Detection', accessor: 'detectionDate' },
  { Header: 'Date de Qualification', accessor: 'decisionDate' },
  { Header: 'Score', accessor: 'score' },
  { Header: 'Statut', accessor: 'status' }
]

const clientMatchStatus = [{value: 'PENDING_QUALIFICATION', label: 'EN ATTENTE DE QUALIFICATION'}, {value: 'VERIFIED', label: 'VÉRIFIÉ'}, {value: 'CLEARED', label: 'FAUX POSITIF'}];
const workflowStatus = [{value: 'PENDING', label: 'EN COURS'}, {value: 'IN_PROGRESS', label: 'EN COURS'}, {value: 'COMPLETED', label: 'COMPLÉTÉ'}];

const ClientMatching: React.FC<ClientMatchingProps> = ({clientID}) => {
  /**
   * MODAL SECTION
   */

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (!modalOpen || modal.current.contains(target) || trigger.current.contains(target)) return;
      setModalOpen(false);
      setModalData(null);
      setSelectedMatch(null);
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
      setSelectedMatch(null);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  /**
   * DATA SECTION
   */

  let { data: workflow, isLoading, error, isError, refetch } = useGetMatchingWorkflowByClientQuery(clientID);
  const [ getEntity ] = useGetEntityOnDemandMutation();
  const [ setQualification ] = useSetMatchQualificationMutation();

  const clientNameOnClick = async (row: any) => {
    const match = workflow?.matches?.find((match) => match.id === row.id);
    const { data: entity } = await getEntity(match?.data.registreId);
    setModalData(entity);
    setModalOpen(!modalOpen)
    setSelectedMatch(match);
  };

  const handleModalOnClick = async (matchID: string, qualification: string) => {
    // Send Qualification to API
    console.log(`qualify match ${matchID} as ${qualification} for workflow ${workflow?.id}`);

    if (!workflow?.id) {
      return;
    }
    if (!matchID) {
      return;
    }

    await setQualification({workflowId: workflow?.id, matchId: matchID, qualification: qualification});
    // reFetch data
    await refetch();

    // Close Modal
    setSelectedMatch(null);
    setModalData(null);
    setModalOpen(false);

    window.location.reload();
  }

  if (isLoading) {
    return (<Loader />);
  }

  if (isError) {
    // @ts-ignore
    if (error?.data.statusCode === 404) {
      console.log('ERREUR 404')
      return <div>Aucun workflow de matching trouvé pour ce client</div>;
    }
    console.log('PAS DE DATA')
    return <div>Erreur lors de la récupération des données</div>;
  }

  const rows = workflow?.matches?.map((match) => {
      return {
        id: match.id,
        name: match.data.nature === 'NATURAL' ? `${match.data.natural.firstName} ${match.data.name}` : match.data.name,
        detectionDate: moment(match.detectionDate, 'YYYY-MM-DDTHH:mm:ss.sssZ.').format('DD/MM/YYYY'),
        decisionDate: match.decisionDate ? moment(match.decisionDate, 'YYYY-MM-DDTHH:mm:ss.sssZ.').format('DD/MM/YYYY') : '' ,
        score: match.score,
        status: clientMatchStatus.find((status) => status.value === match.status)?.label || ''
      }
    }) || [];


  return (
    <div>
      <ClientMatchingDataTable column={columns}
                               rows={rows}
                               matchingInfo={{
                                 status: workflowStatus.find(value => value.value === workflow?.status)?.label || workflow?.status,
                                 total: `${workflow?.matchesCompleted}/${workflow?.totalMatches}` }}
                               onClick={clientNameOnClick} />


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
            <h3 className="pb-2 text-center text-xl font-bold text-black dark:text-white sm:text-2xl">
              {modalData?.nature === 'NATURAL' ? `${modalData?.natural?.firstName} ${modalData?.name}` : modalData?.name}
              {modalData?.EUReference ? `- ${modalData?.EUReference}` : ''} {modalData?.UNReference ? `- ${modalData?.UNReference}` : ''}
            </h3>
            <span className="mx-auto mb-6 inline-block h-1 w-3/6 rounded bg-primary"></span>
          </div>
          <div className="overflow-y-auto max-h-150">
            <EntityIdentityDisplay entity={modalData}/>
            <div className="text-center">
              <span className="mx-auto mb-6 mt-6 inline-block h-1 w-3/6 rounded bg-primary"></span>
            </div>
            <div className="overflow-y-auto h-1/2">
              <EntityInformationDisplay entity={modalData}/>
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap gap-y-4 mt-6">
            <div className="2xsm:w-1/3 w-full px-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedMatch(null);
                  setModalData(null);
                }}
                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
              >
                Retour
              </button>
            </div>
            <div className="2xsm:w-1/3 w-full px-3">
              <button
                disabled={selectedMatch?.status !== 'PENDING_QUALIFICATION'}
                onClick={() => handleModalOnClick(selectedMatch?.id, 'VERIFIED')}
                className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90 hover:border-opacity-90 disabled:bg-opacity-30 disabled:border-opacity-30">
                Vérifié
              </button>
            </div>
            <div className="2xsm:w-1/3 w-full px-3">
              <button
                disabled={selectedMatch?.status !== 'PENDING_QUALIFICATION'}
                onClick={() => handleModalOnClick(selectedMatch?.id, 'CLEARED')}
                className="block w-full rounded border border-stroke bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90 hover:border-opacity-90 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1 disabled:bg-opacity-30 disabled:border-opacity-30"
              >
                Faux Positif
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMatching;
