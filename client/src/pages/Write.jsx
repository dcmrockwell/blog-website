import React, { useState } from "react";
import { useGetUserId } from "../hooks/getUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

const Write = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [write, setWrite] = useState({
    title: "",
    storyBody: "",
    category: [],
    userOwner: userID,
    storyImage: "",
  });

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    const categoryIndex = updatedCategories.indexOf(category);

    if (categoryIndex > -1) {
      updatedCategories.splice(categoryIndex, 1); // Remove category if already selected
    } else {
      updatedCategories.push(category); // Add category if not already selected
    }

    setSelectedCategories(updatedCategories); // Update the selectedCategories state
  };

  const handleImageUpload = (event) => {
    const { name, files } = event.target;
    if (name === "storyImage") {
      // Change the name to "storyImage"
      const file = files[0];
      setSelectedImage(URL.createObjectURL(file));
      setWrite({ ...write, storyImage: file });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWrite({ ...write, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", write.title);
    formData.append("storyBody", write.storyBody);
    formData.append("userOwner", write.userOwner);
    formData.append("storyImage", write.storyImage);
    selectedCategories.forEach((category, index) => {
      formData.append(`category[${index}]`, category);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/write/",
        formData,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      toast.success("Story Posted!", {
        icon: "🎉",
        style: {
          background: "white",
          color: "green",
          border: "1px solid #713200",
          padding: "16px",
        },
      });
      console.log(response.data);
    } catch (error) {
      toast(
        "Please choose atleast 1 category and don't forget to add your story!",
        {
          icon: "❌",
          style: {
            background: "red",
            color: "white",
          },
        }
      );
      console.log(error);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-[1440px] m-auto xl:mb-[100px]">
        <form
          className="flex flex-col py-[50px] gap-5 px-5 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <label className="text-center font-bold">Story Photo</label>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="storyImage"
                className="border-black border-solid border-[1px] rounded-md w-[250px]  ml-10 "
              />
            )}
            <input
              type="file"
              name="storyImage"
              id="storyImage"
              accept=".jpeg, .jpg, .png, .gif"
              className=" ml-10 "
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-[18px] font-bold">
              Title
            </label>
            <textarea
              placeholder="Title"
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              className="border-black border-solid border-[1px] min-h-[50px] max-h-[100px] w-[250px] py-2 px-2 rounded-md resize-y overflow-auto"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-[18px] font-bold">
              Tell us your story
            </label>
            <textarea
              type="text"
              name="storyBody"
              id="storyBody"
              onChange={handleChange}
              className="border-black border-solid border-[1px] min-h-[100px] w-[250px] py-2 px-2 rounded-md resize-y overflow-auto"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold">Categories:</h3>
            <div className="flex flex-row items-center gap-4 py-5">
              <ul>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Technology")}
                      onChange={() => handleCategoryChange("Technology")}
                    />
                    <span className="ml-2"> Technology </span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Programming")}
                      onChange={() => handleCategoryChange("Programming")}
                    />
                    <span className="ml-2"> Programming </span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("AI")}
                      onChange={() => handleCategoryChange("AI")}
                    />
                    <span className="ml-2"> A.I</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Finance")}
                      onChange={() => handleCategoryChange("Finance")}
                    />
                    <span className="ml-2"> Finance</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Investing")}
                      onChange={() => handleCategoryChange("Investing")}
                    />
                    <span className="ml-2"> Investing</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Cryptocurrency")}
                      onChange={() => handleCategoryChange("Cryptocurrency")}
                    />
                    <span className="ml-2"> Crypto</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Science")}
                      onChange={() => handleCategoryChange("Science")}
                    />
                    <span className="ml-2"> Science</span>
                  </label>
                </li>
              </ul>

              <ul>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(
                        "Personal Development"
                      )}
                      onChange={() =>
                        handleCategoryChange("Personal Development")
                      }
                    />
                    <span className="ml-2">Personal</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Travel")}
                      onChange={() => handleCategoryChange("Travel")}
                    />
                    <span className="ml-2">Travel</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Food")}
                      onChange={() => handleCategoryChange("Food")}
                    />
                    <span className="ml-2">Food</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Health")}
                      onChange={() => handleCategoryChange("Health")}
                    />
                    <span className="ml-2">Health</span>
                  </label>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes("Entertainment")}
                        onChange={() => handleCategoryChange("Entertainment")}
                      />
                      <span className="ml-2"> Entertainment</span>
                    </label>
                  </li>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Arts & Culture")}
                      onChange={() => handleCategoryChange("Arts & Culture")}
                    />
                    <span className="ml-2"> Arts & Culture</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Sports")}
                      onChange={() => handleCategoryChange("Sports")}
                    />
                    <span className="ml-2">Sports</span>
                  </label>
                </li>
              </ul>
            </div>

            {selectedCategories.length > 0 && (
              <div>
                <h3>Selected Categories:</h3>
                <ul>
                  {selectedCategories.map((category) => (
                    <li key={category}>#{category}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            className="mt-5 border-black border-[1px] border-solid bg-black text-white font-bold w-[200px] px-4 py-2 rounded-lg"
            type="submit"
          >
            Publish Story
          </button>
        </form>
      </div>
      <footer className="mb-[-5px]">
        <div className="h-[150px] bg-black w-full"></div>
      </footer>
    </div>
  );
};

export default Write;
