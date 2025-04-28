'use client';

// import { Dice1 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';



export default function UserProfilePage() {
    const [loading, setloading] = useState(false)
    const params = useParams();
    const [value, setValue] = useState("");

    

    const [details, setdetails] = useState("")
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        if (params?.slug) {
            setloading(true)
            setValue(decodeURIComponent(params.slug));


            const data = async () => {
                console.log(decodeURIComponent(params.slug))

                const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}api/viewFacultydetails`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: decodeURIComponent(params.slug) }),
                });

                const result = await response.json();
                if (result.success) {
                    setdetails(result.data);
                }

            }

            const imgg = async () => {

                const res = await fetch("/api/userimage", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: decodeURIComponent(params.slug) }),
                });

                const data = await res.json();
                if (data.success) {
                    setUserData(data.data);
                }


            }



            data()
            imgg()


        }


    }, [params.slug]);

    return (
        <div>
{!loading && (
  <div className="min-h-screen w-full flex items-center justify-center p-6">
    <div className="backdrop-blur-md rounded-3xl p-8 w-full max-w-5xl space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 drop-shadow-sm">
       
      </h1>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="rounded-2xl w-72 h-72 bg-gray-300 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-800 w-full">
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-2/5 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-2/4 animate-pulse" />
        </div>
        
        <div className="col-span-full">
          <div className="h-4 bg-gray-300 rounded w-full animate-pulse mb-4" />
          <div className="h-4 bg-gray-300 rounded w-full animate-pulse mb-4" />
          <div className="h-4 bg-gray-300 rounded w-full animate-pulse mb-4" />
        </div>
      </div>

      <div className="text-center">
        <div className="mt-4 w-40 h-10 bg-blue-700 rounded-full animate-pulse mx-auto" />
      </div>
    </div>
  </div>
)}



            {loading && <div>





                {userData && (



                    <div className="mt-14 w-full   flex items-center justify-center ">
                        <div className="backdrop-blur-md pt-7 pb-5 shadow-2xl rounded-3xl  w-full max-w-5xl space-y-8">
                            <h1 className="text-4xl font-extrabold text-center text-blue-800 drop-shadow-sm">
                                🧑‍💼 Professional Profile
                            </h1>

                            <div className="flex flex-col lg:flex-row items-start gap-8">
                                {/* Profile Image */}
                                <div className="md:mx-10 my-5 w-full lg:w-1/3 flex justify-center">
                                    <img
                                         src={`data:${userData.image.contentType};base64,${userData.image.fileBase64}`}
                                         alt={userData.image.filename}
                                        className="mx-32  rounded-2xl w-40 h-52 sm:w-52 sm:h-60 md:w-64 md:h-72 object-cover border-4 border-white shadow-xl"
                                    />

                                    

                                </div>

                                {/* Profile Info */}
                                <div className="mx-5 grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-800 w-full">
                                    <p><span className="font-semibold  text-green-700">Name:</span> {details.name}</p>
                                    <p><span className="font-semibold text-blue-700">Email:</span> {details.email} </p>
                                    <p><span className="font-semibold text-blue-700">Mobile:</span> {details.mobile}</p>

                                    <p><span className="font-semibold text-blue-700">Country:</span> {details.country}</p>
                                    <p><span className="font-semibold text-blue-700">City:</span> {details.city}</p>
                                    <p><span className="font-semibold text-blue-700">Profession:</span> {details.profession}</p>
                                    <p><span className="font-semibold text-blue-700">Category:</span> {details.professionCategory}</p>
                                    <p><span className="font-semibold text-blue-700">Gender:</span>{details.gender} </p>
                                    <p><span className="font-semibold text-blue-700">Experience:</span> {details.experience}/Years </p>
                                    <p><span className="font-semibold text-blue-700">Age:</span> {details.age}</p>
                                    <p><span className="font-semibold text-blue-700">Working Mode:</span> {details.workingMode}</p>
                                    <p><span className="font-semibold text-blue-700">Job Type:</span> {details.jobType}</p>
                                    <p><span className="font-semibold text-blue-700">Created At:</span> {details.createdAt}</p>
                                    <p><span className="font-semibold text-blue-700">Updated At:</span> {details.updatedAt}</p>

                                    {/* Full-width Description */}
                                    <p className="col-span-full font-semibold text-blue-700">
                                        Description: <span className="font-normal text-gray-800">{details.description}</span>
                                    </p>
                                </div>

                            </div>



                            {/* Download Button */}
                            <div className="">
                                {/* <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full shadow-md transition-all duration-200">
                                    📎 Click to Download File
                                </button> */}



                                <a
            href={`data:${userData.file.contentType};base64,${userData.file.fileBase64}`}
            download={userData.file.filename}
            className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full shadow-md transition-all duration-200"
          >
            ⬇️ Download <span className="font-mono">{userData.file.filename}</span>
          </a>



                            </div>


                        </div>
                    </div>







                )}









            </div>}
        </div>
    );
}
