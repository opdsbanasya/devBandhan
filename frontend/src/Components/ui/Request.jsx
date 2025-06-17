import React from 'react'

const Request = ({ request }) => {
  const { firstName, lastName, profilePhoto } = request.fromUserId;

  return (
    <div className="flex items-center gap-5 py-3 px-5 border-b border-b-zinc-800">
      <figure className="w-2/12 cursor-pointer">
        <img
          src={profilePhoto}
          alt={firstName}
          className="w-full object-cover aspect-square rounded-full"
        />
      </figure>
      <div className="w-6/12">
        <h2>{`${firstName} ${lastName}`}</h2>
      </div>
      <div className="space-x-4">
        <button className='cursor-pointer'>✔️</button>
        <button className='cursor-pointer'>❌</button>
      </div>
    </div>
  );
};

export default Request