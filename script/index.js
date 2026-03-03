document.addEventListener('DOMContentLoaded', () => {
    // function to fetch api to get the data 
    const loadLessons = () =>{
        const lessonsApiUrl = "https://openapi.programming-hero.com/api/levels/all";
        fetch(lessonsApiUrl)
        .then(res => res.json())
        .then(lessons => displayLessons(lessons.data))
    }
    // function to display lessons to ui 
    const displayLessons = lessons => {
        // Get the level Container and make it have nothing 
        const levelContainer = document.getElementById('level-container');
        levelContainer.innerHTML = '';
        
        // loop to create all level buttons 
        lessons.forEach(lesson => {
            // Get the div of level button
            const btnDiv = document.createElement('div');
            // Added a tooltip
            btnDiv.classList.add("tooltip");
            btnDiv.setAttribute("data-tip", lesson.lessonName);

            btnDiv.innerHTML = `
                <button class="btn btn-soft btn-primary"> 
                    <i class="fa-solid fa-book-open"></i>
                    Lesson - ${lesson.level_no}
                </button>
            `;
            levelContainer.appendChild(btnDiv);
        });
    }
    loadLessons();
})