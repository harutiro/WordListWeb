var wordList = [];
let questionNumber = 0;

function fixQuestion(question) {

    let nearList = [question.read]

    axios.get(`https://word2vec.harutiro.net/near?get_number=50&str=${question.read}`)
        .then(response => {
            if ("OK" == response.data.status) {
                nearList.push(response.data.data[Math.floor(Math.random() * 50)]);
                nearList.push(response.data.data[Math.floor(Math.random() * 50)])

                nearList.sort(() => Math.random() - 0.5);

                document.querySelector("#ans-1").innerText = nearList[0];
                document.querySelector("#ans-2").innerText = nearList[1];
                document.querySelector("#ans-3").innerText = nearList[2];
            } else {
                console.log(response.data)
            }
        })
        .catch(error => console.error(error))


    // 問題を表示
    document.querySelector("#question-number").innerText = `${questionNumber + 1}問目 `;
    document.querySelector("#question-text").innerText = question.write;
}

function init() {

    // ローカルストレージからデータを取得
    wordList = JSON.parse(localStorage.getItem("wordList"));
    if (wordList == null) {
        wordList = [];
    } else {
        wordList.sort(() => Math.random() - 0.5);
        console.log(wordList)
    }

    document.querySelector("#quiz-ans-image").style.display = "none";
    document.querySelector("#next-button").style.display = "none";

    // 問題を表示
    fixQuestion(wordList[questionNumber]);

    // クリックイベント
    document.querySelector("#ans-1").addEventListener('click', () => {
        if (wordList[questionNumber].read == document.querySelector("#ans-1").innerText) {
            document.querySelector("#quiz-ans-image").src = "img/ok.png";
            const audio = new Audio('audio/ok.mp3');
            audio.play();
        } else {
            document.querySelector("#quiz-ans-image").src = "img/ng.png";
            const audio = new Audio('audio/ng.mp3');
            audio.play();
        }
        document.querySelector("#quiz-ans-image").style.display = "block";
        document.querySelector("#next-button").style.display = "block";
    });

    document.querySelector("#ans-2").addEventListener('click', () => {
        if (wordList[questionNumber].read == document.querySelector("#ans-2").innerText) {
            document.querySelector("#quiz-ans-image").src = "img/ok.png";
            const audio = new Audio('audio/ok.mp3');
            audio.play();
        } else {
            document.querySelector("#quiz-ans-image").src = "img/ng.png";
            const audio = new Audio('audio/ng.mp3');
            audio.play();
        }
        document.querySelector("#quiz-ans-image").style.display = "block";
        document.querySelector("#next-button").style.display = "block";
    });

    document.querySelector("#ans-3").addEventListener('click', () => {
        if (wordList[questionNumber].read == document.querySelector("#ans-3").innerText) {
            document.querySelector("#quiz-ans-image").src = "img/ok.png";
            const audio = new Audio('audio/ok.mp3');
            audio.play();
        } else {
            document.querySelector("#quiz-ans-image").src = "img/ng.png";
            const audio = new Audio('audio/ng.mp3');
            audio.play();
        }
        document.querySelector("#quiz-ans-image").style.display = "block";
        document.querySelector("#next-button").style.display = "block";
    });

    document.querySelector("#next-button").addEventListener('click', () => {
        questionNumber++;
        document.querySelector("#quiz-ans-image").style.display = "none";
        document.querySelector("#next-button").style.display = "none";

        if (questionNumber < wordList.length) {
            fixQuestion(wordList[questionNumber]);
        } else {
            document.querySelector("#ans-1").style.display = "none";
            document.querySelector("#ans-2").style.display = "none";
            document.querySelector("#ans-3").style.display = "none";

            document.querySelector("#question-number").innerText = "終了";
            document.querySelector("#question-text").innerText = "お疲れ様でした\n編集に戻ります";
        }
    });


}