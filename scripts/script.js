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

            btnLevel.setAttribute("id", `btn-lesson-${element.level_no}`);

            btnLevel.className = 'btn btn-outline btn-primary h-full border-2 text-sm font-semibold leading-5.25 py-2 btn-lesson';

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

    fetch(url).then((response) => response.json()).then((json) => {
        displayLevelWords(json);

        [...document.getElementsByClassName('btn-lesson')].forEach((btn) => btn.classList.remove('active'));

        document.getElementById(`btn-lesson-${levelNo}`).classList.add('active');
    });
}

const displayLevelWords = (json) => {
    console.log(json);

    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (!(json.data.length)) {
        wordContainer.classList.remove('grid', 'grid-cols-3', 'gap-7.5');

        wordContainer.innerHTML = `
            <!-- flex flex-col items-center -->
            <div class="text-center space-y-4 p-11">
                <div>
                    <img class="mx-auto" src="assets/alert-error.png" alt="">
                </div>

                    <p class="hind-siliguri-font font-normal text-sm leading-6 text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

                    <h2 class="hind-siliguri-font font-medium text-4xl leading-10 text-[#292524]">নেক্সট Lesson এ যান</h2>
            </div>
        `

        return;
    }

    wordContainer.classList.add('grid', 'grid-cols-3', 'gap-7.5');

    json.data.forEach((word) => {
        const wordCard = document.createElement('div');

        wordCard.className = "text-center p-14 bg-white rounded-xl";

        wordCard.innerHTML = `
            <div class="space-y-6 mb-14">
                <h2 class="inter-font font-bold text-3xl leading-6">${word.word ? word.word : "Word Not Found"}</h2>

                <p class="inter-font font-medium text-xl leading-6">Meaning /Pronunciation</p>

                <h3 class="hind-siliguri-font font-semibold text-3xl text-[#18181B]">"${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}"</h3>
            </div>

            <div class="flex justify-between">
                <button onclick="loadWordDetails(${word.id})" class="btn h-14 w-14 bg-[#1A91FF]/10 text-2xl rounded-lg border-none"><i
                        class="fa-solid fa-circle-info"></i></button>

                <button class="btn h-14 w-14 bg-[#1A91FF]/10 text-2xl rounded-lg border-none"><i
                        class="fa-solid fa-volume-high"></i></button>
            </div>
        `

        wordContainer.append(wordCard);
    });
}

const loadWordDetails = async (wordId) => {
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`;

    const response = await fetch(url);

    const json = await response.json();

    displayWordDetails(json);
}

const displayWordDetails = (json) => {
    const wordDetails = document.getElementById('word-details');
    wordDetails.innerHTML = "";

    wordDetails.className = "rounded-xl border-2 border-[#EDF7FF] p-6 space-y-8";

    wordDetails.innerHTML = `
        <h2 class="font-semibold text-4xl leading-10">${json.data.word} (<i class="fa-solid fa-microphone-lines"></i>:${json.data.pronunciation})</h2>

        <div>
            <h3 class="font-semibold text-2xl leading-10 mb-2.5">Meaning</h3>

            <p class="hind-siliguri-font font-medium text-2xl leading-10">${json.data.meaning}</p>
        </div>

        <div>
            <h3 class="font-semibold text-2xl leading-10 mb-2">Example</h3>

            <p class="font-normal text-2xl leading-10">${json.data.sentence}</p>
        </div>

        <div>
            <h3 class="hind-siliguri-font font-medium text-2xl leading-10 mb-2.5">সমার্থক শব্দ গুলো</h3>

            <div id="word-details-syn" class="flex gap-4.5 flex-wrap">
                
            </div>
        </div>
    `

    const wordDetailsSyn = document.getElementById('word-details-syn');
    wordDetailsSyn.innerHTML = '';

    json.data.synonyms.forEach((word) => {
        const synWord = document.createElement('div');

        synWord.className = 'inline-block py-1.5 px-5 font-normal text-xl leading-10 bg-[#EDF7FF] border-1 border-[#D7E4EF] rounded-md';

        synWord.innerHTML = `${word}`;

        wordDetailsSyn.append(synWord);
    })

    document.getElementById('word-modal').showModal();
}