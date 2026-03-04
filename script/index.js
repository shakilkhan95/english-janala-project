// function to fetch api to get the data
const loadLessons = () => {
  const lessonsApiUrl = "https://openapi.programming-hero.com/api/levels/all";
  fetch(lessonsApiUrl)
    .then((res) => res.json())
    .then((lessons) => displayLessons(lessons.data));
};

// function to display lessons to ui
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
                <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-soft btn-primary"> 
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
  .then(res => res.json())
  .then(words => displayLevelWords(words.data))
}

// function to display words in ui 
const displayLevelWords = (words) => {
    // get the words container and make it empty 
    const wordsContainer = document.getElementById("words-container");
    wordsContainer.innerHTML = '';
    wordsContainer.classList.add("md:grid-cols-2","lg:grid-cols-3");

    // loop through the all words and set the values in ui dynamically
    words.forEach(word => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <!-- word card  -->
            <div class="card bg-white text-white-content h-full pt-5">
                <div class="card-body items-center text-center">
                    <h2 class="card-title text-neutral text-3xl font-bold">${word.word}</h2>
                    <p class="text-neutral text-xl font-medium">Meaning / Pronounciation</p>
                    <h2 class="card-title text-[#18181B] text-3xl font-semibold">${word.meaning} / ${word.pronunciation}</h2>
                    <div class="flex justify-between w-full mt-3">
                        <button class="btn btn-square cursor-default"><i class="fa-solid fa-circle-exclamation"></i></button>
                        <button class="btn btn-square cursor-default"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            </div>
        `;
        wordsContainer.append(cardDiv);
    })
}

loadLessons();
