'use client';

// import { Dice1 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaRegWindowClose } from "react-icons/fa";




export default function UserProfilePage() {
    const [loading, setloading] = useState(false)
    const params = useParams();
    const [value, setValue] = useState("");



    const [details, setdetails] = useState("")
    const [userData, setUserData] = useState(null);

    const [useremail, setuseremail] = useState("")



    useEffect(() => {
        if (params?.slug) {
            setloading(true)
            setValue(decodeURIComponent(params.slug));


            const data = async () => {

                console.log(decodeURIComponent(params.slug))

                const response = await fetch(`/api/viewFacultydetails`, {
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


             const fetchUserEmail = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`/api/useremail`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                });

                const res = await response.json();
                if (res.success) {
                    setuseremail(res.email);
                } else {
                    console.error("Failed to fetch user email:", res.message);
                }
            } catch (err) {
                console.error("Error fetching user email:", err);
            }
        };



            data()
            imgg()
            fetchUserEmail()


        }


    }, [params.slug]);



    // now request section 


      
        const [requestbox, setrequestbox] = useState(false)
        const [mainCategory, setMainCategory] = useState("")
        const [subCategory, setSubCategory] = useState("")
    
        const [subject, setsubject] = useState("")
        const [category, setcategory] = useState("")
        
        const [furgency, setfurgency] = useState("Low")
        const [finalcatogery, setfinalcatogery] = useState("Mentorship")
        const [name, setname] = useState("")
        const [expectedResponseDate, setexpectedResponseDate] = useState("")
    
    
        //  name: mohit
        //  userEmail:"testing@gmail.com"
        //  facultyEmail:"fmail.com"
        //  finalcatogery:"Mentorship"
        //  subject :"Type subject"
        //  category:"Enter information"
        // furgency:"Low"
        //   expectedResponseDate:"20-5-2025" 
        //   status:"Pending" 
        //   mainCategory:"teacher"
        //   subCategory:"math"
    
    
    
    
        const changebox = () => {
            setrequestbox(!requestbox)
        }
    
        const urgency = {
            Low: "Low",
            Medium: "Medium",
            High: "High",
        }
    
        const categories = {
            mentorship: "Mentorship",
            internship: "Internship",
            job: "Job",
            project: "Project",
            research: "Research",
            event: "Event",
            other: "Other"
        }
    
        const professions = {
            doctor: { cardiologist: 'Cardiologist', dermatologist: 'Dermatologist', pediatrician: 'Pediatrician' },
            engineer: { software: 'Software Engineer', civil: 'Civil Engineer', mechanical: 'Mechanical Engineer' },
            teacher: { math: 'Math Teacher', science: 'Science Teacher', english: 'English Teacher' },
            lawyer: { criminal: 'Criminal Lawyer', corporate: 'Corporate Lawyer', family: 'Family Lawyer' },
            artist: { painter: 'Painter', musician: 'Musician', dancer: 'Dancer' }
        };
    
    
        const handleMainCategoryChange = (e) => {
            const selectedCategory = e.target.value;
            setMainCategory(selectedCategory);
            setSubCategory(""); // Reset sub-category when main category changes
        }
    
        const valueonchnage = (e) => {
           if(e.target.placeholder === "Type subject"){
                setsubject(e.target.value)
        }
             if(e.target.placeholder === "Enter information"){
                    setcategory(e.target.value)
              }
            if(e.target.placeholder === "Enter name"){
                setname(e.target.value)
            }
    
            if(e.target.placeholder === "Expected Response Date"){
                setexpectedResponseDate(e.target.value)
            }
     
         }
    
         const seturgency = (e) => {
    
            setfurgency(e.target.value)
         }
         const valueCategory = (e) => {
            setfinalcatogery(e.target.value)
         }
         const submitform = async(e) => {
    
                    e.preventDefault()
    
    
                try {
          const res = await fetch(`/api/AddRequest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name:name , userEmail:useremail,facultyEmail:details.email,category:finalcatogery,subject:subject ,message:category, urgency:furgency,expectedResponseDate:expectedResponseDate ,status:"Pending" ,mainCategory:mainCategory,categoryType:subCategory }),
          });
    
    
                 
    
    
          const data = await res.json();
    
          if (res.ok) {
            alert("Request sent successfully");
            setname("");
            setsubject("");
            setcategory("");
            setfurgency("Low");
            setfinalcatogery("Mentorship");
            setMainCategory("");
            setSubCategory("");
            setrequestbox(false)
          } else {
            alert("Failed to send request")
          }
        } catch (error) {
            console.log(error)
          alert("Error: " + error.message);
        }


    }

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


                                    <Link href={`/userchat/${details.email}`}> <button className="mt-4 bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-full shadow-md transition-all duration-200">Chat  </button></Link>

                                     <button onClick={changebox}  className="mt-4 bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-full shadow-md transition-all duration-200">Send request  </button>
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


                {requestbox && (
                  <div>
                    {/* Background Overlay with blur */}
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>
                
                    {/* Form Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                      <form
                        onSubmit={submitform}
                        className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 max-w-3xl w-full p-8 space-y-8 font-sans text-gray-800 overflow-auto max-h-[90vh]"
                        style={{ animation: "fadeIn 0.3s ease forwards" }}
                      >
                        {/* Close Button */}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={changebox}
                            className="text-gray-500 hover:text-gray-800 text-3xl"
                            aria-label="Close form"
                          >
                            <FaRegWindowClose />
                          </button>
                        </div>
                
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-lg font-semibold mb-2">
                            Enter Name
                          </label>
                          <input
                            id="name"
                            required
                            onChange={valueonchnage}
                            type="text"
                            placeholder="Enter name"
                            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                          />
                        </div>
                
                
                        <div>
                             <label htmlFor="date" className="block text-lg font-semibold mb-2">
                            Expected Response Date
                          </label>
                          <input
                            id="date"
                            required
                            onChange={valueonchnage}
                            type="date"
                            placeholder="Expected Response Date"
                            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                          />
                
                        </div>
                
                        {/* Subject */}
                        <div>
                          <label htmlFor="subject" className="block text-lg font-semibold mb-2">
                            Subject
                          </label>
                          <input
                            id="subject"
                            required
                            onChange={valueonchnage}
                            type="text"
                            placeholder="Type subject"
                            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                          />
                        </div>
                
                        {/* Category */}
                        <div>
                          <label htmlFor="category" className="block text-lg font-semibold mb-2">
                            Category
                          </label>
                          <select
                            id="category"
                            onChange={valueCategory}
                            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                          >
                            <option value="">Select</option>
                            {Object.keys(categories).map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                
                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-lg font-semibold mb-2">
                            Message
                          </label>
                          <textarea
                            id="message"
                            required
                            onChange={valueonchnage}
                            placeholder="Enter information"
                            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm resize-y focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                            rows={5}
                          />
                        </div>
                
                        {/* Urgency */}
                        <div>
                          <label htmlFor="urgency" className="block text-lg font-semibold mb-2">
                            Urgency
                          </label>
                          <select
                            id="urgency"
                            onChange={seturgency}
                            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                          >
                            <option value="">Select</option>
                            {Object.keys(urgency).map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                
                        {/* Profession Section */}
                        <section>
                          <h2 className="text-3xl font-bold mb-6 text-blue-700 tracking-wide">
                            Professional Categories
                          </h2>
                
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Main Category */}
                            <div>
                              <label
                                htmlFor="mainCategory"
                                className="block mb-2 font-semibold text-gray-700"
                              >
                                Main Category
                              </label>
                              <select
                                id="mainCategory"
                                onChange={handleMainCategoryChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-500 transition"
                              >
                                <option value="">-- Select Main Category --</option>
                                {Object.keys(professions).map((value) => (
                                  <option key={value} value={value}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                  </option>
                                ))}
                              </select>
                            </div>
                
                            {/* Sub Category */}
                            <div>
                              <label
                                htmlFor="subCategory"
                                className="block mb-2 font-semibold text-gray-700"
                              >
                                Category Type
                              </label>
                              <select
                                id="subCategory"
                                required
                                onChange={(e) => setSubCategory(e.target.value)}
                                disabled={!mainCategory}
                                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-500 transition disabled:bg-gray-100"
                              >
                                <option value="">Select</option>
                                {mainCategory &&
                                  Object.entries(professions[mainCategory]).map(([key, val]) => (
                                    <option key={key} value={key}>
                                      {val}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </section>
                
                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300"
                        >
                          Submit
                        </button>
                        {subject} {category} {mainCategory} {subCategory} {furgency} {finalcatogery} {name} {expectedResponseDate}
                
                      </form>
                    </div>
                  </div>
                )}









            </div>}
        </div>
    );
}
