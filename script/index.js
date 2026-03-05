// function to fetch api to get the data
const loadLessons = () => {
  const lessonsApiUrl = "https://openapi.programming-hero.com/api/levels/all";
  fetch(lessonsApiUrl)
    .then((res) => res.json())
    .then((lessons) => displayLessons(lessons.data));
};

// function to display lessons buttons to ui
const displayLessons = (lessons) => {
  // Get the level Container and make it have nothing
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // loop to create all level buttons
  lessons.forEach((lesson) => {
    // Get the div of level button
    const btnDiv = document.createElement("div");
    // Added a tooltip
    btnDiv.classList.add("tooltip");
    btnDiv.setAttribute("data-tip", lesson.lessonName);

    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" value="${lesson.level_no}" class="btn btn-soft btn-primary lesson-btn"> 
                    <i class="fa-solid fa-book-open"></i>
                    Lesson - ${lesson.level_no}
                </button>
            `;
    levelContainer.appendChild(btnDiv);
  });
};

// function to fetch and load words from api
const loadLevelWords = (id) => {
  const wordsApiUrl = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(wordsApiUrl)
    .then((res) => res.json())
    .then((words) => {
      toggleState(); //to add btn-soft class for all buttons by default
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.remove("btn-soft");

      displayLevelWords(words.data);
    });
};

// function to add btn-soft class for all buttons by default
const toggleState = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => {
    btn.classList.add("btn-soft");
  });
};

// function to display words in ui
const displayLevelWords = (words) => {
  // get the words container and make it empty
  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = "";

  //checking if there is no words in any levels.
  if (words.length === 0) {
    wordsContainer.classList.remove("md:grid-cols-2", "lg:grid-cols-3");
    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = `
            <div><img class="mx-auto" src="./assets/alert-error.png"></div>
            <p class="text-center text-sm text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="text-center text-3xl text-[#292524] font-bangla mt-5">নেক্সট Lesson এ যান</h3>
        `;
    wordsContainer.append(alertDiv);
    return;
  }

  wordsContainer.classList.add("md:grid-cols-2", "lg:grid-cols-3");

  // loop through the all words and set the values in ui dynamically
  words.forEach((word) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
            <!-- word card  -->
            <div class="card bg-white text-white-content h-full pt-5">
                <div class="card-body items-center text-center">
                    <h2 class="card-title text-neutral text-3xl font-bold">${word.word ? word.word : "!শব্দটি পাওয়া যায়নি"}</h2>
                    <p class="text-neutral text-xl font-medium">Meaning / Pronounciation</p>
                    <h2 class="card-title text-[#18181B] text-3xl font-semibold">"${word.meaning ? word.meaning : "!অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "!Pronunciation পাওয়া যায়নি"}"</h2>
                    <div class="flex justify-between w-full mt-3">
                        <button onclick="loadWordDetails(${word.id})" class="btn btn-square cursor-default"><i class="fa-solid fa-circle-exclamation"></i></button>
                        <button class="btn btn-square cursor-default"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            </div>
        `;
    wordsContainer.append(cardDiv);
  });
};

// function to fetch and load word details
const loadWordDetails = async (id) => {
  const wordDetailsUrl = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(wordDetailsUrl);
  const details = await res.json();
  displayWordDetails(details.data)
};

// function to display word details in ui by a modal
const displayWordDetails = (word) => {
    const wordDetailsContainer = document.getElementById("details-container");
    wordDetailsContainer.innerHTML = `
                <h2 class="text-4xl font-semibold text-black">${word.word ? word.word : "!শব্দটি পাওয়া যায়নি"} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation ? word.pronunciation : "!শব্দটি পাওয়া যায়নি"})
                </h2>
                <div>
                    <p class="text-2xl font-semibold text-black">Meaning</p>
                    <p class="text-2xl font-semibold text-black font-bangla">${word.meaning ? word.meaning : "!অর্থ পাওয়া যায়নি"}</p>
                </div>
    
                <div>
                    <p class="text-2xl font-semibold text-black">Example</p>
                    <p class="text-2xl text-black">${word.sentence ? word.sentence : "!বাক্যটি পাওয়া যায়নি"}</p>
                </div>
    
                <div class="space-y-2">
                    <p class="text-2xl font-medium text-black font-bangla text-center">সমার্থক শব্দ গুলো</p>
                    <div class="flex justify-center items-center flex-wrap gap-5">
                        ${displaySynonyms(word.synonyms)}
                    </div>
                </div>
    `;
    document.getElementById("word_modal").showModal();
}

// function to display synonyms dynamically

const displaySynonyms = (synonyms) => {
  const htmlElement = synonyms.map(
    (el) =>
      `<span class="rounded bg-blue-200 p-2">${el}</span>`
  );
  if(htmlElement.join(' ').length === 0){
    return `<span class="rounded bg-blue-200 p-2">"!সমার্থক শব্দ পাওয়া যায়নি"</span>`;
  }
  return htmlElement.join(' ');
}

loadLessons();
