var wordList = [];

// クラス
class TodoList {
    // コンストラクタ
    constructor() {
        this.DOM = {};
        this.DOM.containerRow = document.querySelector("#container-row");

    }
    // リストを生成
    _createItem(write , read , id) {
        const cardElm = document.createElement('card');
        const divWordElm = document.createElement('div');
        const pWriteElm = document.createElement('p');
        const pReadElm = document.createElement('p');
        const divButtonElm = document.createElement('div');
        const deleteButtonElm = document.createElement('button');
        const deleteIconElm = document.createElement('i');
        const editButtonElm = document.createElement('button');
        const editIconElm = document.createElement('i');
        const idElm = document.createElement('id');


        cardElm.classList.add('card', 'word-card', 'text-center', 'position-relative', 'col-sm-6', 'col-md-3' , 'm-3');
        divWordElm.classList.add('word-card-text');
        pWriteElm.classList.add('h3');
        pWriteElm.innerText = write;
        pReadElm.classList.add('h3');
        pReadElm.innerText = read;
        deleteButtonElm.classList.add('btn', 'icon-button', 'position-absolute', 'start-0', 'm-2');
        deleteIconElm.classList.add('fa', 'icon', 'fa-trash');
        editButtonElm.classList.add('btn', 'icon-button', 'position-absolute', 'end-0', 'm-2');
        editIconElm.classList.add('fa', 'icon', 'fa-edit');
        idElm.innerText = id;
        idElm.style.display = "none";

        // 完了ボタンクリック
        // TODO: 完了ボタンを押した時の処理
        // editButtonElm.addEventListener('click', (e) => {
        //     this.deleteItem(e.srcElement.parentNode, this.DOM.incomplete);
        //     this.addCompleteItem(text);
        // });

        // 削除ボタンクリック
        deleteButtonElm.addEventListener('click', (e) => {
            const confirmation = confirm("タスクを削除しても良いですか？");

            if (confirmation) {
                this.deleteItem(e.target.closest(".card"), this.DOM.containerRow);
            }
        });

        // 生成した要素
        divWordElm.appendChild(pWriteElm);
        divWordElm.appendChild(pReadElm);
        deleteButtonElm.appendChild(deleteIconElm);
        editButtonElm.appendChild(editIconElm);
        divButtonElm.appendChild(deleteButtonElm);
        divButtonElm.appendChild(editButtonElm);
        cardElm.appendChild(divWordElm);
        cardElm.appendChild(divButtonElm);
        cardElm.appendChild(idElm);

        return cardElm;
    }
    // リストを新規追加
    addItem(write , read , id) {
        this.DOM.containerRow.appendChild(this._createItem(write , read , id));
        wordList.push(new Word(id , write , read , "tag"));
        console.log(wordList)
        
        localStorage.setItem("wordList", JSON.stringify(wordList));

    }

    //画面の表示だけよう
    viewItem(write , read , id){
        this.DOM.containerRow.appendChild(this._createItem(write , read , id));
    }

    // リストを削除
    deleteItem(target, domparent) {
        domparent.removeChild(target);
        wordList = wordList.filter((word) => {
            return word.id != target.querySelector("id").innerText;
        });
        localStorage.setItem("wordList", JSON.stringify(wordList));
        console.log(wordList)

    }
}

function addtodoEvent() {
    const writeItemTxt = document.querySelector("#write-text").value;
    const readItemTxt = document.querySelector("#read-text").value;
    // 値を入力していない時は処理を終了
    if (writeItemTxt == "" || readItemTxt == "") {
        alert("値を入力してください");
        return
    }
    // フォームの値をリセット
    document.querySelector("#write-text").value = "";
    document.querySelector("#read-text").value = "";

    // インスタンス化
    const totoList = new TodoList();
    totoList.addItem(writeItemTxt, readItemTxt, createUuid());
}

function init() {
    // クリックイベント
    document.querySelector("#save-button").addEventListener('click', () => {
        addtodoEvent();
    });

    // ローカルストレージからデータを取得
    wordList = JSON.parse(localStorage.getItem("wordList"));
    if (wordList == null) {
        wordList = [];
    }else{
        console.log(wordList)
        wordList.forEach((word) => {
            const totoList = new TodoList();
            totoList.viewItem(word.write, word.read, word.id);
        });
    }
    


}