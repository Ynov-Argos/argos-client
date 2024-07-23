const updateUserForm = () => {
  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form 2 --> */}
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Contact Form 2
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="(321) 5555-0115"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Message
              </label>
              <textarea
                rows={6}
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default updateUserForm;
