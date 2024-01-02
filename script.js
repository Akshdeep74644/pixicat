const generateAiImages = async (text, num) => {
  const key = "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";
  try {
    console.log(text, num);
    // Send a request to the OpenAI API to generate images based on user inputs
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          prompt: `${text}`,
          n: 3,
          size: "512x512",
          response_format: "b64_json",
        }),
      }
    );
    // Throw an error message if the API response is unsuccessful
    if (!response.ok)
      throw new Error(
        "Failed to generate AI images. Make sure your API key is valid."
      );
    const { data } = await response.json(); // Get data from the response
    updateCard([...data]);
    console.log(data);
  } catch (error) {
    alert(error.message);
  }
};

const howresult = (e) => {
  const resultContaier = (document.querySelector(".image_container").innerHTML =
    e == null
      ? ` <div class="loader_box">
  <div class="spinner_box"></div>
</div>`
      : e);
};

const generateIt = () => {
  const imgDescription = document.getElementById("imgdescription").value;
  const noOfimgGenerate = document.querySelector("#noofimage").value;
  howresult();
  generateAiImages(imgDescription, noOfimgGenerate);
};

const updateCard = (data) => {
  const updatedcardmap = data.map((e, i) => {
    const imgurl = data[i].b64_json;
    console.log(imgurl);
    return `<div class="img_box">
        <img src="data:image/jpeg;base64,${imgurl}" alt="">
        </div>`;
  });
  howresult(updatedcardmap);
};
