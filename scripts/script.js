const loadLevels = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((response) => response.json())
        .then((json) => displayLessonButtons(json));

    const displayLessonButtons = (json) => {
        const levelContainer = document.getElementById('level-container');
        levelContainer.innerHTML = '';

        json.data.forEach(element => {
            const btnLevel = document.createElement('button');

            btnLevel.setAttribute("onclick", `loadLevelWords(${element.level_no})`);

            btnLevel.className = 'btn btn-outline btn-primary h-full border-2 text-sm font-semibold leading-5.25 py-2';

            btnLevel.innerHTML = `
                <i class="fa-solid fa-book-open"></i> Lesson -${element.level_no}
            `

            levelContainer.append(btnLevel);
        });
    }
}

loadLevels();

const loadLevelWords = (levelNo) => {
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;

    fetch(url).then((response) => response.json()).then((json) => displayLevelWords(json));
}

const displayLevelWords = (json) => {
    console.log(json);

    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    json.data.forEach((word) => {
        const wordCard = document.createElement('div');

        wordCard.className = "text-center p-14 bg-white rounded-xl";

        wordCard.innerHTML = `
            <div class="space-y-6 mb-14">
                <h2 class="inter-font font-bold text-3xl leading-6">${word.word}</h2>

                <p class="inter-font font-medium text-xl leading-6">Meaning /Pronunciation</p>

                <h3 class="hind-siliguri-font font-semibold text-3xl text-[#18181B]">"${word.meaning} / ${word.pronunciation}"</h3>
            </div>

            <div class="flex justify-between">
                <button class="btn h-14 w-14 bg-[#1A91FF]/10 text-2xl rounded-lg border-none"><i
                        class="fa-solid fa-circle-info"></i></button>

                <button class="btn h-14 w-14 bg-[#1A91FF]/10 text-2xl rounded-lg border-none"><i
                        class="fa-solid fa-volume-high"></i></button>
            </div>
        `
        wordContainer.append(wordCard);
    });
}