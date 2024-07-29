import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectGroupDropdown from '../SelectGroupDropdown.tsx';
import { useCreateClientMutation } from '../../../services/client/ClientApiSlice.ts';

const CreateClientForm: React.FC = () => {
  const [idExterne, setIdExterne] = useState('');
  const [type, setType] = useState('');
  const [typeRelation, setTypeRelation] = useState('');
  const [natural, setNatural] = useState('');
  const [legal, setLegal] = useState('');
  const [vessel, setVessel] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [lieuNaissance, setLieuNaissance] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [adresse2, setAdresse2] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [pays, setPays] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createClient] = useCreateClientMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !nom || !prenom) {
      toast.error("Les champs Email, Prénom et Nom sont obligatoires");
      return;
    }

    setIsSubmitting(true);

    const client = {
      idExterne, type, typeRelation, natural, legal, vessel,
      prenom, nom, dateNaissance, lieuNaissance, nationalite,
      email, adresse, adresse2, ville, codePostal, pays
    };

    try {
      const data = await createClient(client).unwrap();
      console.log(data);
      toast.success('Client créé avec succès');
      // Réinitialiser le formulaire
      setIdExterne('');
      setType('');
      setTypeRelation('');
      setNatural('');
      setLegal('');
      setVessel('');
      setPrenom('');
      setNom('');
      setDateNaissance('');
      setLieuNaissance('');
      setNationalite('');
      setEmail('');
      setAdresse('');
      setAdresse2('');
      setVille('');
      setCodePostal('');
      setPays('');
    } catch (err) {
      console.log(err);
      if (err.data && err.data.statusCode === 400) {
        toast.error("L'e-mail est déjà utilisé");
      } else {
        toast.error(`Error: ${err.data ? err.data.message : 'Une erreur est survenue'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeOptions = [{ value: 'Type1', label: 'Type1' }, { value: 'Type2', label: 'Type2' }, { value: 'Type3', label: 'Type3' }];

  return (
    <div className="">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Création d'un client
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Id Externe
                  </label>
                  <input
                    type="text"
                    value={idExterne}
                    onChange={(e) => setIdExterne(e.target.value)}
                    placeholder="Entrez l'Id externe"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Type
                  </label>
                  <SelectGroupDropdown options={typeOptions} dropdownTitle={'Sélectionnez un type'} setSelectedOption={setType} selectedOption={type} />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Type de relation
                  </label>
                  <input
                    type="text"
                    value={typeRelation}
                    onChange={(e) => setTypeRelation(e.target.value)}
                    placeholder="Entrez le type de relation"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Natural
                  </label>
                  <input
                    type="text"
                    value={natural}
                    onChange={(e) => setNatural(e.target.value)}
                    placeholder="Pas sûr"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Legal
                  </label>
                  <input
                    type="text"
                    value={legal}
                    onChange={(e) => setLegal(e.target.value)}
                    placeholder="Entrez le nom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Vessel
                  </label>
                  <input
                    type="text"
                    value={vessel}
                    onChange={(e) => setVessel(e.target.value)}
                    placeholder="Entrez le nom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Entrez le prénom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Entrez le nom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Date de naissance
                  </label>
                  <input
                    type="text"
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                    placeholder="Entrez la date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Lieu de naissance
                  </label>
                  <input
                    type="text"
                    value={lieuNaissance}
                    onChange={(e) => setLieuNaissance(e.target.value)}
                    placeholder="Entrez le lieu de naissance"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nationalité
                  </label>
                  <input
                    type="text"
                    value={nationalite}
                    onChange={(e) => setNationalite(e.target.value)}
                    placeholder="Entrez la nationalité"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez le mail"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    placeholder="Entrez l'adresse"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Adresse 2
                  </label>
                  <input
                    type="text"
                    value={adresse2}
                    onChange={(e) => setAdresse2(e.target.value)}
                    placeholder="Entrez l'adresse"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    placeholder="Entrez la ville"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Code Postal
                  </label>
                  <input
                    type="text"
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                    placeholder="Entrez le code postal"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Pays
                </label>
                <input
                  type="text"
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  placeholder="Entrez le pays"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                />
              </div>

              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Création en cours...' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateClientForm;
