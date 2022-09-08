/**
 * TODO:
 * Save tileList in local storage ✅
 * Improve styles on card and menus
 * Go further on tiles CRUD
 * Improve categories view ✅
 * 
 * 08/16 
 * Migrate delete cat method to delBtn category trash button ✅
 * validate duplicated inputs on create modes (tiles and categories)
 * Create an interesting designed element when on :hover shows Tiles props // https://atomiks.github.io/tippyjs/v6/html-content/
 * 
 * 08/19
 * Give action over trash button on categories ✅
 * Manage to remove tile form tilesContainer when deleted
 * Spike and research a better way to render tiles
 * Feature: to group tiles by category
 */

/**
 * HELPERS
 */
 class User {
    constructor(userName, userEmail, userPassword) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    }   
  
    consoleUser() {
      console.log(`User Name: ${this.userName}`);
      console.log(`User Email: ${this.userEmail}`);
      console.log(`User Password: ${this.userPassword}`);
    }

    newUserAlert() {
        const userAlertEl = document.createElement('div');
        userAlertEl.setAttribute('id', 'userAlert');
        userAlertEl.classList.add('userAlertAdvice')
        const root = document.getElementById('root')
        root.appendChild(userAlertEl);
    }

  }

console.log(User);



 const removeItemFromArr = (arr, item) => {
    let i = arr.indexOf(item);
    i !== -1 && arr.splice(i, 1);
};

const handleCancelBtn = (btn, dialog) => {
    btn = document.getElementById(`${btn}`)
    btn.addEventListener("click", () => {
        dialog.close();
        root.removeChild(dialog);
    })
}

/**
 * Card component
 * @param {tileImg, tileName, tileUrl, tileCategory} props
 * @returns string
 */
const Card = (props) => {
    let { tileImg, tileName, tileUrl, tileCategory, tileLike, tileDate } = props;

    tileLike ? tileLike = `<span>👍</span>` : tileLike = `<span>👎</span>`

    return `
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="${tileImg}" alt="Avatar" ">
            </div>
            <div class="flip-card-back">
                <h1>${tileName}</h1>
                <a href="${tileUrl}" target="_blank">${tileUrl}</a>
                <p> <strong>Category: </strong>${tileCategory}</p>
                <p>${tileLike}</p>
                <p>${tileDate}</p>
            </div>
        </div>
    </div>
    `
};

/**
 * Render engine
 */

const renderEngine = (elementWrapper) => {
    let elementToRenderOn;

    const renderApi = {
        to: (tagName, attr, attrName) => {
            elementToRenderOn = document.createElement(tagName);
            elementToRenderOn.setAttribute(attr, attrName);
            return renderApi;
        },

        render: (contentToRender) => {
            elementToRenderOn.innerHTML = contentToRender;
            elementWrapper.appendChild(elementToRenderOn);
        },
    };

    return renderApi;
};

/** 
 *  CATEGORIES CONTAINERS
 */ 
let catList = JSON.parse(localStorage.getItem('Categories')) || []

const root = document.getElementById("root");
let catMenu = document.createElement("menu");

let catListContainer = document.createElement("container");
catListContainer.setAttribute("id", "catListContainer");
catListContainer.innerHTML = "Categories: "

let catListContainerList = document.createElement("ul");
    catList.forEach(cat => {
        catListContainerList.innerHTML += `
            <li class="delBtn-${cat}">
                ${cat}
            <i onclick="trashBtn()" class="glyphicon glyphicon-trash delBtn" id="delBtn-${cat}"></i>
            </li>`
    })
catListContainer.appendChild(catListContainerList);
root.appendChild(catListContainer);

/**
 * CATEGORIES MENU
 */
renderEngine(catMenu)
    .to("button", "id", "createCatBtn")
    .render("Create Category");

renderEngine(catMenu)
    .to("button", "id", "deleteCatBtn")
    .render("Delete Category");

renderEngine(catMenu)
    .to("button", "id", "showCatBtn")
    .render("Show Category");

root.appendChild(catMenu);

/**
 * TILES MENU
 */

 let tilesMenu = document.createElement("menu");

 renderEngine(tilesMenu)
     .to("button", "id", "createTileBtn")
     .render("Create Tile");
 
 root.appendChild(tilesMenu);



/**
 * CREATE PROFILE
 */
 const header = document.querySelector('.header')
 const profileBtn = document.getElementById('profileBtn');
 profileBtn.addEventListener('click', () => {

    renderEngine(root)
    .to("dialog", "id", "createProfileDialog")
    .render(
        `
        <input type="text" id="createProfileInputName" placeholder="Name">
        <input type="text" id="createProfileInputEmail" placeholder="Email">
        <input type="text" id="createProfileInputPassword" placeholder="Password">
        <button id="createProfileBtnDialog">Ok</button>
        <button id="cancelCreateProfileBtn">Cancel</button>
        `
    );
        let createProfileDialog = document.getElementById("createProfileDialog")
        handleCancelBtn('cancelCreateProfileBtn', createProfileDialog)
        createProfileDialog.showModal();

        const createProfileBtnDialog = document.getElementById('createProfileBtnDialog');

        createProfileBtnDialog.addEventListener("click", () => {
            let newName = document.getElementById('createProfileInputName').value;
            let newEmail = document.getElementById('createProfileInputEmail').value;
            let newPassword = document.getElementById('createProfileInputPassword').value;
            let newUser = new User(newName, newEmail, newPassword)
            newUser.consoleUser();
            newUser.newUserAlert();
            createProfileDialog.close();
            root.removeChild(createProfileDialog)
        })
 })

/**
 * CREATE CATEGORY
 */

createCatBtn.addEventListener("click", () => {
    renderEngine(root)
        .to("dialog", "id", "createCatDialog")
        .render(
            `
            <input type="text" id="createCatInput" placeholder="Type new Category">
            <button id="createCatBtnDialog">Ok</button>
            <button id="cancelCreateCatBtn">Cancel</button>
            `
        );

    let createCatDialog = document.getElementById("createCatDialog");

    handleCancelBtn('cancelCreateCatBtn', createCatDialog)

    createCatDialog.showModal();

    let createCatBtnDialog = document.getElementById("createCatBtnDialog");

    createCatBtnDialog.addEventListener("click", () => {
        catList = JSON.parse(localStorage.getItem('Categories')) || []
        let createCatInput = document.getElementById("createCatInput").value;
        catList.push(createCatInput);
        localStorage.setItem('Categories', JSON.stringify(catList))
        catListContainerList.innerHTML += `
            <li class="delBtn-${createCatInput}">
                ${createCatInput}
            <i onclick="trashBtn()" class="glyphicon glyphicon-trash delBtn" id="delBtn-${createCatInput}"></i>
            </li>`;
        createCatDialog.close();
        root.removeChild(createCatDialog);
    });
});

/**
 * 
 * DELETE TRASH BTN
 */

function trashBtn(e) {
    catList = JSON.parse(localStorage.getItem('Categories'))
    let delIdCat = event.target.id;
    let delClassCat = document.querySelector(`.${delIdCat}`)
    let delClassCatInner = delClassCat.innerText
    removeItemFromArr(catList, delClassCatInner)
    localStorage.setItem('Categories', JSON.stringify(catList))
    
    catListContainerList.removeChild(delClassCat)
    
}

/**
 * DELETE CATEGORY
 */

deleteCatBtn.addEventListener("click", () => {
  catList = JSON.parse(localStorage.getItem('Categories'))
    renderEngine(root)
        .to("dialog", "id", "deleteCatDialog")
        .render(
            `
          <span id="categoriesSpanList">Categories: ${catList}
          <input type="text" id="deleteCatInput" placeholder="Delete Category">
          <button id="deleteCatBtnDialog">Ok</button>
          <button id="cancelDeleteCatBtn">Cancel</button>
          `
        );

    let deleteCatDialog = document.getElementById("deleteCatDialog");

    handleCancelBtn('cancelDeleteCatBtn', deleteCatDialog)

    deleteCatDialog.showModal();

    let deleteCatBtnDialog = document.getElementById("deleteCatBtnDialog");
    
    deleteCatBtnDialog.addEventListener("click", () => {
        let deleteCatInput = document.getElementById("deleteCatInput").value;

        removeItemFromArr(catList, deleteCatInput);

        localStorage.setItem('Categories', JSON.stringify(catList))

        let categoriesSpanList = document.getElementById("categoriesSpanList");
        categoriesSpanList.innerHTML = `Categories: ${catList}`;
        catListContainerList.innerHTML = `Categories: <li>${catList}</li>`;
        deleteCatDialog.close();
        root.removeChild(deleteCatDialog);
    });
});

/**
 * SHOW CATEGORY
 */

showCatBtn.addEventListener("click", () => {
    catList = JSON.parse(localStorage.getItem('Categories'))
    renderEngine(root)
        .to("dialog", "id", "showCatDialog")
        .render(
            `
      <div id="showCatContainer">
          Categories:
          ${catList}
          </div>
          <button id="okShowButton">OK</button>
      `
        );

    showCatDialog.showModal();
    let okShowButton = document.getElementById("okShowButton");
    okShowButton.addEventListener("click", () => {
        showCatDialog.close();
        root.removeChild(showCatDialog);
    });
});

/**
 * TILES CONTAINERS
 */
let tilesList = JSON.parse(localStorage.getItem('Tiles')) || []
let id = 0;

renderEngine(root)
.to("div", "id", "tilesContainer")
.render("")

if (tilesList !== []) {
    tilesList.forEach(tile => {
        renderEngine(tilesContainer).to("div", "class", "tile").render(Card(tile));
    })
}



/**
 * CREATE TILE
 */

let createTileBtn = document.getElementById("createTileBtn");

createTileBtn.addEventListener("click", () => {
    renderEngine(root)
        .to("dialog", "id", "createTileDialog")
        .render(
            `
          <label for="tileName">Name:</label>
          <input type="text" name="tileName" id="tileName" placeholder="Name">

          <label for="tileUrl">URL:</label>
          <input type="text" name="tileUrl" id="tileUrl" placeholder="URL"> 

          <label for="selectCategory"></label>
          <select name="selectCategory" id="selectCategory"></select>
          
          
          <input type="text" name="tileImg" id="tileImg" placeholder="Paste image URL">

          <label for="like">Like</label>
          👍<input type="radio" name="like" value="like">
          👎<input type="radio" name="like" value="unlike">
          <button id="createTileBtnDialog">Create Tile</button>
          <button id="cancelTileBtn">Cancel</button>
        `
        );

    // catList = JSON.parse(localStorage.getItem('Categories'))
    catList ? catList : catlist = JSON.parse(localStorage.getItem('Categories'))
    let select = document.getElementById("selectCategory");
      catList.forEach((cat) => {
        select.innerHTML += `<option>${cat}</option>`;
    });

    let createTileDialog = document.getElementById("createTileDialog");

    handleCancelBtn('cancelTileBtn', createTileDialog)

    createTileDialog.showModal();

    let createTileBtnDialog = document.getElementById("createTileBtnDialog");
    
    createTileBtnDialog.addEventListener("click", () => {
        const tileName = document.getElementById("tileName").value;
        const tileUrl = document.getElementById("tileUrl").value;
        const tileCategory = document.getElementById("selectCategory").value;
        const tileImg = document.getElementById("tileImg").value;
        const tileLike = document.querySelector('[name="like"]').checked;
        let date = new Date().toLocaleDateString();

        let newTile = {
            tileName: tileName,
            tileUrl: tileUrl,
            tileCategory: tileCategory,
            tileImg: tileImg,
            tileLike: tileLike,
            tileDate: date,
            id: id++,
        };
        tilesList.push(newTile)
        localStorage.setItem('Tiles', JSON.stringify(tilesList))


        renderEngine(tilesContainer).to("div", "class", "tile").render(Card(newTile));
        createTileDialog.close();
        root.removeChild(createTileDialog);
    });
});

/**
 * DELETE TILE
 */

renderEngine(tilesMenu)
    .to("button", "id", "deleteTileBtn")
    .render("Delete Tile");

let deleteTileBtn = document.getElementById('deleteTileBtn')

deleteTileBtn.addEventListener("click", () => {
    tilesList = JSON.parse(localStorage.getItem('Tiles'))
    let mappedTilesList = tilesList.map((tile) => {
        return tile.tileName
    })
    renderEngine(root)
    .to("dialog", "id", "deleteTileDialog")
    .render(
        `
        <span id="tilesSpanList">Tiles: ${mappedTilesList}
        <input type="text" id="deleteTileInput" placeholder="Delete Tile">
        <button id="deleteTileBtnDialog">Ok</button>
        <button id="cancelDeleteTileBtn">Cancel</button>
        `
    )

    let deleteTileDialog = document.getElementById("deleteTileDialog")
        
    handleCancelBtn('cancelDeleteTileBtn', deleteTileDialog)

    // let cancelDeleteTileBtn = document.getElementById("cancelDeleteTileBtn")
    // cancelDeleteTileBtn.addEventListener("click", () => {
    //     deleteTileDialog.close();
    //     root.removeChild(deleteTileDialog)
    // })

    deleteTileDialog.showModal();

    let deleteTileBtnDialog = document.getElementById("deleteTileBtnDialog")

    deleteTileBtnDialog.addEventListener("click", () => {
        let deleteTileInput = document.getElementById("deleteTileInput").value

        removeItemFromArr(tilesList, deleteTileInput)

        localStorage.setItem('Tiles', JSON.stringify(tilesList))

        let tilesSpanList = document.getElementById("tilesSpanList")
        tilesSpanList.innerHTML = `Tiles: ${tilesList}`
        deleteTileDialog.close()
        root.removeChild(deleteTileDialog)
    })
})
