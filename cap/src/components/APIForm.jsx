import React, { useState } from "react";

/**component for handling the form */
/**passing inputs, handleChange, onSubmit as props to APIForm so we can edit our inputs state variable properly  */
const APIForm = ({inputs, handleChange, onSubmit}) => {

    /**take user inputs, do error handling to handle cases if user enters no inout values in form */
    /**error handling: sets default values to be assigned when user enters no input */
    const submitForm = () => {
        let defaultValues = {
            format: "jpeg",
            no_ads: "true",
            no_cookie_banners: "true",
            width: "1920",
            height: "1080",
        };
        /**make sure there is a url provided by user. If no url, API query shouldn't be made & let user know using alert() */
        if(inputs.url == "" || inputs.url == " "){
            alert("You forgot to submit a url!");
        } else{/**if there's a url, check rest of inputs to see if we need to include any default values */
            for(const [key, value] of Object.entries(inputs)) {
                if(value == ""){
                    inputs[key] = defaultValues[key]
                }
            }
        }
        /**call makeQuery() after we've properly checked our inputs variable */
        makeQuery();
    }

    /**helper function to take input values & assemble them into the right query string format that the API call needs */
    const makeQuery = () => {
        {/**these parameters don't need to be chosen by user, but still need to be included */}
        let wait_until = "network_idle";
        let response_type = "json";
        let fail_on_status = "400%2C404%2C500-511";
        let url_starter = "https://";
        let fullURL = url_starter + inputs.url;

        /**assemble query */
        let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs. width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

        /**make API call with callAPI() */
        callAPI(query).catch(console.error);
    }


    /**async func to make API call with newly created query */
    const callAPI = async (query) => {
        /**make fetch call with await */
        const response = await fetch(query);
        /**save response as a simple json */
        const json = await response.json();
        /**to see in console what the API returns */
        console.log(json);

        /**check if no url from API call and give user more descriptive error message*/
        if(json.url == null){
            alert("OOps! Something went wrong with that query, let's try again!")
        } else{
            setCurrentImage(json.url);
        }
    }


    /**state variable to hold & display current screenshot */
    const [currentImage, setCurrentImage] = useState(null);

    


    const inputsInfo = [
        "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
        "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
        "Input true or false if you would like your website screenshot to not contain any ads",
        "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
        "Choose the width of your screenshot (in pixels)",
        "Choose the height of your screenshot (in pixels)",
    ];

    return (
        <div>
            <h2>Select Your Image Attributes:</h2>
            <form className="form-container">
                {/**turning dictionary in app.jsx into an array of key & values we can loop through using Object.entries() */}
                {inputs &&
                    Object.entries(inputs).map(([category, value], index) => (
                        <li className="form" key={index}>
                            <h2>{category} </h2>
                            <input
                                type="text"
                                name={category}
                                value={value}
                                placeholder="Input this attribute..."
                                onChange={handleChange}
                                className="textbox"
                            />
                            <br></br>
                            <br></br>
                            <p> {inputsInfo[index]}</p>
                        </li>
                    ))}
            </form>
            {/**add a button for submitting */}
            <button type="submit" className="button" onClick={onSubmit}>Take that Pic! </button>
            
            

        </div>
    );
};

export default APIForm;

