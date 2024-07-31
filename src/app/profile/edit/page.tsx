"use client";
import UploadButton from "@/app/Components/ImgUpload";
import LocationSearch from "@/app/Components/LocationSearch";
import SearchableSelect from "@/app/Components/SearchableSelect";
import primRole from "./data/primryRole.json";
import expOpns from "./data/expOpns.json";
import skillsOpns from "./data/skills.json";
import pronouns from "./data/pronouns.json";
import genderOpns from "./data/gender.json";
import ethinicity from "./data/ethinicity.json";
import { useEffect, useState } from "react";
import SelectTags from "@/app/Components/SelectTags";
import Select, { MultiValue, SingleValue } from "react-select";
import { TextInput } from "@/stories/TextInput";
import Sidebar from "@/app/Components/HireDashSidebar";
import "./Stylin.css";
import ToggleSwitch from "@/app/Components/ToggleSwitch";
import MultiSelect from "@/app/Components/MultiSelect";
import CompanySelect from "@/app/Components/CompanySelect";
import EducationSelect from "@/app/Components/EducationSelect";
import ExperienceCard from "@/app/Components/ExperienceCard";
import axios from "axios";

import { format } from "date-fns";
import DateSelect from "@/app/Components/DatePickerComponent";
import EducationCard from "@/app/Components/EducationCard";
import degreeOpns from "./data/degree.json";

const Home: React.FC = () => {
  const [aboutFetch, setaboutFetch] = useState({
    name: "",
    company_name: "",
    designation: "",
    product_service: "",
    company_stage: "",
    locn: "faridabad",
    primrole: "",
    yrs: "",
    openroles: [],
    logo: "",
    bio: "",
  });
  const [about, setabout] = useState(aboutFetch);

  const [socialmediaFetch, setsocialmediaFetch] = useState({
    website: "",
    linkedin: "",
    github: "",
    twtr: "",
  });
  const [socialmedia, setsocialmedia] = useState(socialmediaFetch);

  const [expDef, setexpDef] = useState({
    company: "",
    title: "",
    start: null,
    end: null,
    currentlyWorking: false,
    desc: "",
  });
  const [exp, setexp] = useState(expDef);

  const [eduDef, seteduDef] = useState({
    education: "",
    graduation: null,
    degree: "",
    gpa: "",
    maxgpa: "",
  });
  const [edu, setedu] = useState(eduDef);

  const [skillsFetch, setskillsFetch] = useState([]);
  const [skills, setskills] = useState(skillsFetch);

  const [achievementsFetch, setachieveFetch] = useState("");
  const [achievements, setachieve] = useState(achievementsFetch);

  const [identityFetch, setidentityFetch] = useState({
    pronouns: "",
    PronounsSelfdescribe: "",
    pronounsdisp: false,
    gender: "",
    genderSelfDescribe: "",
    ethnicity: [],
  });
  const [identity, setidentity] = useState(identityFetch);

  const deepEqual = (obj1: object, obj2: object) => {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 === null ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key]))
        return false;
    }

    return true;
  };

  const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  const handle = (
    key: string,
    value: string,
    obj: object,
    setObj: Function
  ) => {
    if (obj[key] === value) return;
    setObj({ ...obj, [key]: value });
  };

  const EdusAtIndex = (index: number) => {
    if (index == Edus.length) return null;
    return Edus[index];
  };

  const ExpsAtIndex = (index: number) => {
    if (index == Exps.length) return null;
    return Exps[index];
  };

  const updateItem = (index: number, newItem: object[]) => {
    Exps[index] = newItem;
  };
  const updateEdusItem = (index: number, newItem: object[]) => {
    Edus[index] = newItem;
  };

  const deleteItem = (index: number) => {
    const newItems = [...Exps];
    newItems.splice(index, 1);
    setExps(newItems);
  };
  const deleteEdusItem = (index: number) => {
    const newItems = [...Edus];
    newItems.splice(index, 1);
    setEdus(newItems);
  };

  const renderExp = (experience: object, ind: number) => {
    return (
      <ExperienceCard
        company={experience.company}
        title={experience.title}
        start={experience.start}
        end={experience.end}
        currentlyWorking={experience.currentlyWorking}
        description={experience.desc}
        ind={ind}
        Exps={Exps}
        update={updateItem}
        del={deleteItem}
        flgedit={seteditedflg}
        ExpsAtInd={ExpsAtIndex}
      />
    );
  };
  const renderEdu = (experience: object, ind: number) => {
    return (
      <EducationCard
        education={experience.education}
        graduation={experience.graduation}
        degree={experience.degree}
        gpa={experience.gpa}
        maxgpa={experience.maxgpa}
        ind={ind}
        Edus={Edus}
        update={updateEdusItem}
        del={deleteEdusItem}
        flgedit={seteditedflg}
        EdusAtInd={EdusAtIndex}
      />
    );
  };

  const renderEditedExp = (experience: object, ind: number) => {
    seteditedflg(false);

    return (
      <EducationCard
        education={experience.education}
        graduation={experience.graduation}
        degree={experience.degree}
        gpa={experience.gpa}
        maxgpa={experience.maxgpa}
        ind={ind}
        Edus={Edus}
        update={updateEdusItem}
        del={deleteEdusItem}
        flgedit={seteditedflg}
        ExpsAtInd={ExpsAtIndex}
      />
    );
  };

  const renderEditedEdu = (experience: object, ind: number) => {
    seteditedflg(false);

    return (
      <ExperienceCard
        company={experience.company}
        title={experience.title}
        start={experience.start}
        end={experience.end}
        currentlyWorking={experience.currentlyWorking}
        description={experience.desc}
        ind={ind}
        Edus={Edus}
        update={updateItem}
        flgedit={seteditedflg}
        EdusAtInd={EdusAtIndex}
      />
    );
  };

  if (
    identity.PronounsSelfdescribe != "" &&
    identity.pronouns != "Self-describe"
  )
    handle("PronounsSelfdescribe", "", identity, setidentity);
  if (identity.genderSelfDescribe != "" && identity.gender != "Self-describe")
    handle("genderSelfDescribe", "", identity, setidentity);

  const [addExp, setaddExp] = useState(false);
  const [addEdu, setaddEdu] = useState(false);
  const [editedflg, seteditedflg] = useState(false);

  const [Exps, setExps] = useState([]);
  const [Edus, setEdus] = useState([]);
  const [username, setusername] = useState("");

  console.log(about);
  console.log(identity);
  if (exp.currentlyWorking) handle("end", null, exp, setexp);
  console.log(exp);
  const divcls = "border-t border-t-white pt-[37px]",
    buttonbg = "#3b82f6",
    buttondiv = "flex space-x-4",
    labelcls = "block text-sm font-medium text-[16px] font-bold";

  const getUserName = () => {
    const accessToken = localStorage.getItem("access_token");
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/accounts/profile/";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setusername(response.data.first_name.split(" ")[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserName();
  });

  return (
    <div>
      <Sidebar userName={username} />

      <main className="grid w-full h-full pl-[240px]">
        <div className="min-h-screen bg-white text-black">
          <div className="max-w-[80%] mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 border shadow-lg bg-[#fffff0] rounded-md mt-[5px] mb-[5px] p-[5%]">
              <div className={`flex flex-row`}>
                <div className="w-[35%]">
                  <h2 className="text-lg font-medium ">About</h2>
                  <p className="text-sm">
                    Tell us about yourself so seekers know who you are
                  </p>
                </div>

                <div className="w-[61%] ml-[4%]">
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        Your name*
                      </label>
                      <input
                        className="mt-1 h-[35px] w-full rounded-md border bg-gray-100 text-black border-gray-400 p-4"
                        value={about.name}
                        onChange={(e) =>
                          handle("name", e.target.value, about, setabout)
                        }
                      />

                      <label htmlFor="website" className={labelcls}>
                        Company Name*
                      </label>
                      <input
                        className="mt-1 h-[35px] w-full rounded-md border bg-gray-100 text-black border-gray-400 p-4"
                        value={about.company_name}
                        onChange={(e) =>
                          handle(
                            "company_name",
                            e.target.value,
                            about,
                            setabout
                          )
                        }
                      />

                      <div className="mt-[14px] flex flex-row align-center items-center">
                        <UploadButton
                          imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTloMhHd2WEOdSnlj28yN-agPUzYU4U1iGekw&s"
                          bgcol="rgb(62, 62, 62)"
                          buttonBg="rgb(30, 7, 94)"
                          keyy="logo"
                          resetflg
                          val={about.logo}
                          onChange={(key: string, value: string) => {
                            handle(key, value, about, setabout);
                          }}
                        />
                        <span className="ml-[4px]">
                          Upload your Profile pic
                        </span>
                      </div>
                      {about.logo != "" && (
                        <button
                          className="text-black mt-[8px] font-bold py-2 px-8 rounded"
                          onClick={(e) => handle("logo", "", about, setabout)}
                          style={{ backgroundColor: "rgb(30, 7, 94)" }}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <label htmlFor="website" className={labelcls}>
                      Designation*
                    </label>
                    <input
                      className="mt-1 h-[35px] w-full rounded-md border bg-gray-100 text-black border-gray-400 p-4"
                      value={about.designation}
                      onChange={(e) =>
                        handle("designation", e.target.value, about, setabout)
                      }
                    />

                    {/* <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        Where are you based?*
                      </label>
                      <LocationSearch
                        val={about.locn}
                        handle={(val: string) => {
                          handle("locn", val, about, setabout);
                        }}
                      />
                    </div> */}

                    {/* <div className="flex flex-row w-[220%]">
                      <div className="sm:col-span-2 w-[70%]">
                        <label htmlFor="website" className={labelcls}>
                          Select your primary role*
                        </label>
                        <SearchableSelect
                          options={primRole}
                          phdr="Select your primary role"
                          handle={(val: string) => {
                            handle("primrole", val, about, setabout);
                          }}
                          val={about.primrole}
                        />
                      </div>
                      <div className="sm:col-span-2 w-[25%] ml-[5%]">
                        <label htmlFor="website" className={labelcls}>
                          Years*
                        </label>
                        <SearchableSelect
                          options={expOpns}
                          phdr="Experience"
                          handle={(val: string) => {
                            handle("yrs", val, about, setabout);
                          }}
                          val={about.yrs}
                        />
                      </div>
                    </div> */}

                    {/* <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        Open to the following roles
                      </label>
                      <SelectTags
                        options={primRole}
                        phdr="Select Roles"
                        handle={(val: any) => {
                          handle("openroles", val, about, setabout);
                        }}
                        val={about.openroles}
                      />
                    </div> */}

                    <label htmlFor="website" className={labelcls}>
                      Type of Company (Product based or Service Based)*
                    </label>
                    <input
                      className="mt-1 h-[35px] w-full rounded-md border bg-gray-100 text-black border-gray-400 p-4"
                      value={about.product_service}
                      onChange={(e) =>
                        handle(
                          "product_service",
                          e.target.value,
                          about,
                          setabout
                        )
                      }
                    />

                    <label htmlFor="website" className={labelcls}>
                      Company Stage*
                    </label>
                    <input
                      className="mt-1 h-[35px] w-full rounded-md border bg-gray-100 text-black border-gray-400 p-4"
                      value={about.company_stage}
                      onChange={(e) =>
                        handle(
                          "company_stage",
                          e.target.value,
                          about,
                          setabout
                        )
                      }
                    />

                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        Company Description
                      </label>
                      <textarea
                        className="mt-1 block w-full rounded-md border bg-gray-100 text-black border-gray-400 p-4 min-h-[205px]"
                        placeholder="Stanford CS, Full stack generalist; launched a successful Android app, worked at Google"
                        value={about.bio}
                        onChange={(e) =>
                          handle("bio", e.target.value, about, setabout)
                        }
                      />
                    </div>

                    {!deepEqual(about, aboutFetch) && (
                      <div className={buttondiv}>
                        <button
                          className="text-white font-bold py-2 px-8 rounded"
                          style={{ backgroundColor: buttonbg }}
                          onClick={(e) => setabout(aboutFetch)}
                        >
                          Reset
                        </button>
                        <button
                          className="bg-purple-500 text-white font-bold px-8 rounded"
                          style={{ backgroundColor: buttonbg }}
                          onClick={(e) => setaboutFetch(about)}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`flex flex-row ${divcls}`}>
                <div className="w-[35%]">
                  <h2 className="text-lg font-medium ">Social Profiles</h2>
                  <p className="text-sm ">Where can people find you online?</p>
                </div>

                <div className="w-[61%] ml-[4%]">
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1720569600&semt=ais_hybrid"
                            alt="Description of Image"
                            className="w-6 aspect-square object-cover rounded-lg shadow-md"
                          />
                          <p className="">Website</p>
                        </div>
                      </label>
                      <input
                        className="mt-1 h-[35px] bg-gray-100 text-black w-full rounded-md border border-gray-400 p-4"
                        placeholder="https://"
                        onChange={(e) =>
                          handle(
                            "website",
                            e.target.value,
                            socialmedia,
                            setsocialmedia
                          )
                        }
                        value={socialmedia.website}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://banner2.cleanpng.com/20180518/yk/kisspng-computer-icons-linkedin-5aff0283a31f04.0344839015266617636682.jpg"
                            alt="Description of Image"
                            className="w-6 aspect-square object-cover rounded-lg shadow-md"
                          />
                          <p className="">LinkedIn</p>
                        </div>
                      </label>
                      <input
                        className="mt-1 h-[35px] w-full rounded-md bg-gray-100 text-black border border-gray-400 p-4"
                        placeholder="https://linkedin.com/in/username"
                        onChange={(e) =>
                          handle(
                            "linkedin",
                            e.target.value,
                            socialmedia,
                            setsocialmedia
                          )
                        }
                        value={socialmedia.linkedin}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-823jqxdr.png"
                            alt="Description of Image"
                            className="w-6 aspect-square object-cover rounded-lg shadow-md"
                          />
                          <p className="">GitHub</p>
                        </div>
                      </label>
                      <input
                        className="mt-1 h-[35px] w-full rounded-md bg-gray-100 text-black border border-gray-400 p-4"
                        placeholder="https://github.com/username"
                        onChange={(e) =>
                          handle(
                            "github",
                            e.target.value,
                            socialmedia,
                            setsocialmedia
                          )
                        }
                        value={socialmedia.github}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRVa8lLOwmvEjX6C_zHd7IzDOUShvDBpjLw&s"
                            alt="Description of Image"
                            className="w-6 aspect-square object-cover rounded-lg shadow-md"
                          />
                          <p className="">Twitter</p>
                        </div>
                      </label>
                      <input
                        className="mt-1 h-[35px] w-full rounded-md bg-gray-100 text-black border border-gray-400 p-4"
                        placeholder="https://twitter.com/username"
                        onChange={(e) =>
                          handle(
                            "twtr",
                            e.target.value,
                            socialmedia,
                            setsocialmedia
                          )
                        }
                        value={socialmedia.twtr}
                      />
                    </div>

                    {!deepEqual(socialmedia, socialmediaFetch) && (
                      <div className={buttondiv}>
                        <button
                          className="bg-purple-500 text-white font-bold py-2 px-8 rounded"
                          onClick={(e) => setsocialmedia(socialmediaFetch)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Reset
                        </button>
                        <button
                          className="bg-purple-500 text-white font-bold px-8 rounded"
                          onClick={(e) => setsocialmediaFetch(socialmedia)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className={`flex flex-row ${divcls}`}>
                <div className="w-[35%]">
                  <h2 className="text-lg font-medium ">Your work experience</h2>
                  <p className="text-sm ">
                    What other positions have you held?
                  </p>
                </div>

                <div className="w-[61%] ml-[4%]">
                  {!editedflg &&
                    Exps.map((experience, index) =>
                      renderExp(experience, index)
                    )}
                  {editedflg &&
                    Exps.map((experience, index) =>
                      renderEditedExp(experience, index)
                    )}

                  {!addExp && (
                    <button
                      className="text-[#2563eb] mt-[9px]"
                      onClick={(e) => setaddExp(true)}
                    >
                      + Add work experience
                    </button>
                  )}
                  {addExp && (
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 bg-[#fffff0] p-[8px] border border-grey-100 rounded text-black">
                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          Company*
                        </label>
                        <CompanySelect
                          handle={(val: string) => {
                            handle("company", val, exp, setexp);
                          }}
                          val={exp.company || ""}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          Title*
                        </label>
                        <input
                          className="mt-1 h-[35px] w-full rounded-md border border-gray-400 p-4"
                          value={exp.title}
                          onChange={(e) =>
                            handle("title", e.target.value, exp, setexp)
                          }
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          Start date*
                        </label>
                        <DateSelect
                          value={exp.start}
                          handleChange={(val: string) => {
                            handle("start", val, exp, setexp);
                          }}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        {!exp.currentlyWorking && (
                          <div>
                            <label htmlFor="website" className={labelcls}>
                              End date*
                            </label>
                            <DateSelect
                              value={exp.end}
                              handleChange={(val: string) => {
                                handle("end", val, exp, setexp);
                              }}
                            />
                          </div>
                        )}
                        <div className="mt-[14px] flex flex-row align-center items-center">
                          <ToggleSwitch
                            isChecked={exp.currentlyWorking}
                            onToggle={(val: boolean) => {
                              handle("currentlyWorking", val, exp, setexp);
                            }}
                          />
                          <span className="ml-[4px]">
                            I currently work here
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          Description
                        </label>
                        <textarea
                          className="mt-1 block w-full rounded-md border-gray-300 border border-gray-400 p-4 min-h-[205px]"
                          placeholder="Description"
                          value={exp.desc}
                          onChange={(e) =>
                            handle("desc", e.target.value, exp, setexp)
                          }
                        />
                      </div>

                      <div className={buttondiv}>
                        <button
                          className="text-white font-bold py-2 px-8 rounded"
                          style={{ backgroundColor: buttonbg }}
                          onClick={(e) => {
                            setexp(expDef);
                            setaddExp(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-purple-500 text-white font-bold px-8 rounded"
                          style={{ backgroundColor: buttonbg }}
                          onClick={(e) => {
                            Exps.push(exp);
                            setexp(expDef);
                            setaddExp(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`flex flex-row ${divcls}`}>
                <div className="w-[35%]">
                  <h2 className="text-lg font-medium ">Education</h2>
                  <p className="text-sm ">
                    Which Institutions have you studied at?
                  </p>
                </div>

                <div className="w-[61%] ml-[4%]">
                  {!editedflg &&
                    Edus.map((experience, index) =>
                      renderEdu(experience, index)
                    )}
                  {editedflg &&
                    Edus.map((experience, index) =>
                      renderEditedEdu(experience, index)
                    )}

                  {!addEdu && (
                    <button
                      className="text-[#2563eb] mt-[9px]"
                      onClick={(e) => setaddEdu(true)}
                    >
                      + Add Education
                    </button>
                  )}
                  {addEdu && (
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 bg-[#fffff0] p-[8px] border border-grey-100 rounded text-black">
                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          Education*
                        </label>
                        <EducationSelect
                          handle={(val: string) => {
                            handle("education", val, edu, setedu);
                          }}
                          val={edu.education || ""}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          Graduation*
                        </label>
                        <DateSelect
                          value={edu.graduation}
                          handleChange={(val: string) => {
                            handle("graduation", val, edu, setedu);
                          }}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          Degree & Major
                        </label>
                        <SearchableSelect
                          options={degreeOpns}
                          handle={(val: string) => {
                            handle("degree", val, edu, setedu);
                          }}
                          val={edu.degree}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="website" className={labelcls}>
                          GPA
                        </label>
                        <div className="flex flex-row ">
                          <div className="sm:col-span-2 w-[47.5%]">
                            <input
                              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4"
                              placeholder="GPA"
                              value={edu.gpa}
                              onChange={(e) =>
                                handle("gpa", e.target.value, edu, setedu)
                              }
                            />
                          </div>
                          <div className="sm:col-span-2 w-[47.5%] ml-[5%]">
                            <input
                              className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4"
                              placeholder="Max"
                              value={edu.maxgpa}
                              onChange={(e) =>
                                handle("maxgpa", e.target.value, edu, setedu)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className={buttondiv}>
                        <button
                          className="text-white font-bold py-2 px-8 rounded"
                          style={{ backgroundColor: buttonbg }}
                          onClick={(e) => {
                            setedu(eduDef);
                            setaddEdu(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-purple-500 text-white font-bold px-8 rounded"
                          style={{ backgroundColor: buttonbg }}
                          onClick={(e) => {
                            Edus.push(edu);
                            setedu(eduDef);
                            setaddEdu(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`flex flex-row ${divcls}`}>
                <div className="w-[35%]">
                  <h2 className="text-lg font-medium ">Your Skills</h2>
                  <p className="text-sm ">
                    This will help startups hone in on your strengths.
                  </p>
                </div>

                <div className="w-[61%] ml-[4%]">
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div className="sm:col-span-2">
                      <SelectTags
                        options={skillsOpns}
                        phdr="Select Roles"
                        handle={setskills}
                        val={skills}
                      />
                    </div>

                    {!arraysEqual(skills, skillsFetch) && (
                      <div className={buttondiv}>
                        <button
                          className="bg-purple-500 text-white font-bold py-2 px-8 rounded"
                          onClick={(e) => setskills(skillsFetch)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Reset
                        </button>
                        <button
                          className="bg-purple-500 text-white font-bold px-8 rounded"
                          onClick={(e) => setskillsFetch(skills)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`flex flex-row ${divcls}`}>
                <div className="w-[35%]">
                  <h2 className="text-lg font-medium ">Achievements</h2>
                  <p className="text-sm ">
                    Sharing more details about yourself will help you stand out
                    more.
                  </p>
                </div>

                <div className="w-[61%] ml-[4%]">
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div className="sm:col-span-2">
                      <textarea
                        className="mt-1 block w-full rounded-md bg-gray-100 text-black border border-gray-400 p-4 min-h-[205px]"
                        placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
                        onChange={(e) => setachieve(e.target.value)}
                        value={achievements}
                      />
                    </div>

                    {achievements != achievementsFetch && (
                      <div className={buttondiv}>
                        <button
                          className="bg-purple-500 text-white font-bold py-2 px-8 rounded"
                          onClick={(e) => setachieve(achievementsFetch)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Reset
                        </button>
                        <button
                          className="bg-purple-500 text-white font-bold px-8 rounded"
                          onClick={(e) => setachieveFetch(achievements)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}

              <div className={`flex flex-row ${divcls}`}>
                <div className="w-[35%]">
                  <h2 className="text-lg font-medium ">Identity</h2>
                  <p className="text-sm ">
                    At CodeUnity, we’re committed to helping companies hire in a
                    more inclusive way. Part of that includes asking candidates
                    to share demographic information so we can help recruiters
                    understand and build their pipeline. Self identifying is
                    completely optional, and we'll handle your information with
                    care. Your responses to gender and ethnicity will not be
                    displayed on your profile, and displaying your pronouns is
                    optional.
                  </p>
                </div>

                <div className="w-[61%] ml-[4%]">
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        <p className="">Pronouns</p>
                      </label>
                      <SearchableSelect
                        options={pronouns}
                        handle={(val: string) => {
                          handle("pronouns", val, identity, setidentity);
                        }}
                        val={identity.pronouns}
                      />
                      {identity.pronouns == "Self-describe" && (
                        <div className="sm:col-span-2 mt-4">
                          <label htmlFor="website" className={labelcls}>
                            <p className="">Pronouns – Self-describe</p>
                          </label>
                          <input
                            className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4"
                            placeholder="eg. She/They"
                            onChange={(e) =>
                              handle(
                                "PronounsSelfdescribe",
                                e.target.value,
                                identity,
                                setidentity
                              )
                            }
                            value={identity.PronounsSelfdescribe}
                          />
                        </div>
                      )}
                      <div className="mt-[14px] flex flex-row align-center items-center">
                        <ToggleSwitch
                          isChecked={identity.pronounsdisp}
                          onToggle={(val: boolean) => {
                            handle("pronounsdisp", val, identity, setidentity);
                          }}
                        />
                        <span className="ml-[4px]">
                          Display pronouns on my profile
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        <p className="">Gender Identity</p>
                      </label>
                      <SearchableSelect
                        options={genderOpns}
                        handle={(val: string) => {
                          handle("gender", val, identity, setidentity);
                        }}
                        val={identity.gender}
                      />
                      {identity.gender == "Self-describe" && (
                        <div className="sm:col-span-2 mt-4">
                          <label htmlFor="website" className={labelcls}>
                            <p className="">Gender Identity – Self-describe</p>
                          </label>
                          <input
                            className="mt-1 h-[35px] w-full rounded-md border-gray-300 border border-gray-400 p-4"
                            placeholder="Please write in your description"
                            onChange={(e) =>
                              handle(
                                "genderSelfDescribe",
                                e.target.value,
                                identity,
                                setidentity
                              )
                            }
                            value={identity.genderSelfDescribe}
                          />
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="website" className={labelcls}>
                        <p className="">Race/Ethnicity</p>
                        <p
                          className="text-[11px]"
                          style={{ color: "rgb(175, 175, 175)" }}
                        >
                          You can select multiple
                        </p>
                      </label>
                      <br />
                      <MultiSelect
                        options={ethinicity}
                        onSelectionChange={(val: string) => {
                          handle("ethnicity", val, identity, setidentity);
                        }}
                        val={identity.ethnicity}
                      />
                    </div>

                    {!deepEqual(identity, identityFetch) && (
                      <div className={buttondiv}>
                        <button
                          className="bg-purple-500 text-white font-bold py-2 px-8 rounded"
                          onClick={(e) => setidentity(identityFetch)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Reset
                        </button>
                        <button
                          className="bg-purple-500 text-white font-bold px-8 rounded"
                          onClick={(e) => setidentityFetch(identity)}
                          style={{ backgroundColor: buttonbg }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
