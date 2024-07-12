const searchField = document.getElementById("searchFieldID");
const searchBtn = document.getElementById("searchBtnID");
const usersDer = document.getElementById("defaultUsers");
const usersgrou = document.getElementById("inGroup");
const userscnt = document.getElementById("memberscnt");
const toggleGroup = document.getElementById("toggleBtn");
const modalV = document.getElementById("playerDeatils");
const Home = document.getElementById("homeBtn");

const loadDefault = async (searchValue) => {
  const reqData = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchValue}`
  );
  let res = await reqData.json();
  if (res.player === null) {
    usersDer.innerHTML += `<h1>No Data Found With "${searchValue}"</h1>`;
  } else {
    res.player.slice(0, 10).map(
      (user) =>
        (usersDer.innerHTML += `
    <div class="userCard">
    <div class="profileImg">
      <img
        src="${
          user.strThumb
            ? user.strThumb
            : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
        }"
        alt=""
      />
    </div>
    <div class="cardcontent">
      <h3>
        Name :
        <span style="font-weight: normal">${user.strPlayer.slice(0, 18)}</span>
      </h3>
      <h3>
        Nationality :
        <span style="font-weight: normal">${user.strNationality}</span>
      </h3>
      <h3>
        Team :
        <span style="font-weight: normal">${user.strTeam}</span>
      </h3>
      <h3>
        Sports : <span style="font-weight: normal">${user.strSport}</span>
      </h3>
    </div>
    <div class="socialMedia">
        ${
            user.strFacebook &&
          `<a href="https://${user.strFacebook}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook" ></i></a>`
        }
        ${
            user.strInstagram &&
          `<a href="https://${user.strInstagram}" target="_blank" rel="noopener noreferrer" ><i class="fa-brands fa-instagram"></i></a>`
        }
          
          ${
            user.strTwitter &&
            `<a href="https://${user.strTwitter}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-twitter"></i></a>`
          }
          
          ${
            user.strYoutube &&
            `<a href="https://${user.strYoutube}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>`
          }
          
          ${
            user.strWebsite &&
            `<a href="https://${user.strWebsite}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-edge"></i></a>`
          }
          
        </div>
    <div class="cardbtns" id="cardBtns">
      <button class="vau" onClick="addGroup(${user.idPlayer}, this)">Add Group</button>
      <button onClick="viewDetails(${user.idPlayer})">View Details</button>
    </div>
  </div>
    `)
    );
  }
};
loadDefault("");

Home.addEventListener("click", () => {
  window.location.reload();
});

searchBtn.addEventListener("click", () => {
  usersDer.innerHTML = "";
  const searchVal = searchField.value;
  searchVal
    ? loadDefault(searchVal)
    : `${(alert("Please Insert A Name"), loadDefault(""))}`;
});

//add to groupp

let flag = 0;
const addGroup = async (userID, button) => {
  const userObjrec = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${userID}`
  );
  let userObjRes = await userObjrec.json();

  if (flag < 11) {
    flag += 1;
    button.innerText = "Player Added";
    button.disabled = true;
    button.style.backgroundColor = "rgba(128, 128, 128, 0.74)";
    const grpCNT = parseInt(userscnt.innerText);
    userscnt.innerText = (grpCNT + 1).toString();
    const selectedplayer = userObjRes.players[0];
    usersgrou.innerHTML += `
      <div class="groupMembers">
      <img
        src="${
          selectedplayer.strThumb
            ? selectedplayer.strThumb
            : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
        }"
        alt=""
      />
      <div class="membersName">
        <h3 style="font-weight: normal">${selectedplayer.strPlayer}</h3>
        <h5>${selectedplayer.strTeam}</h5>
        <h5>${selectedplayer.strNationality}</h5>
      </div>
    </div>
    `;
  } else {
    alert("You Can't Add More Than 11");
  }

  usersgrou.style.visibility = "visible";
};

toggleGroup.addEventListener("click", () => {
  if (usersgrou.style.visibility === "hidden") {
    usersgrou.style.visibility = "visible";
  } else {
    usersgrou.style.visibility = "hidden";
  }
});

//modal fanctions

const viewDetails = async (userID) => {
    try {
      modalV.innerHTML = `<div style="text-align: center; margin-top: 20px;"><i class="fa-solid fa-spinner-third fa-spin" style="font-size: 36px;"></i><br>Loading...</div>`;
      
      const reqData = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${userID}`);
      const resData = await reqData.json();
      
      if (resData.players && resData.players.length > 0) {
        const userInfo = resData.players[0];
        
        modalV.innerHTML = `
          <div class="modalInner">
            <div class="img-icon">
              <div class="close-icon">
                <i onClick="closeModal()" class="fa-solid fa-circle-xmark" style="color: #543310;"></i>
              </div>
            </div>
            <img src="${userInfo.strThumb ? userInfo.strThumb : 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'}" alt="Player Image" />
            <h3>Name: <span>${userInfo.strPlayer ? userInfo.strPlayer : 'N/A'}</span></h3>
            <h3>Nationality: <span>${userInfo.strNationality ? userInfo.strNationality : 'N/A'}</span></h3>
            <h3>Date of Birth: <span>${userInfo.dateBorn ? userInfo.dateBorn : 'N/A'}</span></h3>
            <h3>Team: <span>${userInfo.strTeam ? userInfo.strTeam : 'N/A'}</span></h3>
            <h3>Sports: <span>${userInfo.strSport ? userInfo.strSport : 'N/A'}</span></h3>
            <h3>Income: <span>${userInfo.strWage ? userInfo.strWage : 'N/A'}</span></h3>
            <h3>Gender: <span>${userInfo.strGender ? userInfo.strGender : 'N/A'}</span></h3>
            <h3>Playing Position: <span>${userInfo.strPosition ? userInfo.strPosition : 'N/A'}</span></h3>
            <div class="socialMedia">
              ${userInfo.strFacebook ? `<a href="https://${userInfo.strFacebook}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i></a>` : ''}
              ${userInfo.strInstagram ? `<a href="https://${userInfo.strInstagram}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>` : ''}
              ${userInfo.strTwitter ? `<a href="https://${userInfo.strTwitter}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-twitter"></i></a>` : ''}
              ${userInfo.strYoutube ? `<a href="https://${userInfo.strYoutube}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>` : ''}
              ${userInfo.strWebsite ? `<a href="https://${userInfo.strWebsite}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-edge"></i></a>` : ''}
            </div>
            <p>${userInfo.strDescriptionEN ? userInfo.strDescriptionEN : 'No description available'}</p>
          </div>
        `;
        
        modalV.style.display = "flex";
      } else {
        modalV.innerHTML = `<div style="text-align: center; margin-top: 20px;">Player data not found.</div>`;
      }
    } catch (error) {
      console.error('Error fetching player details:', error);
      modalV.innerHTML = `<div style="text-align: center; margin-top: 20px;">Error fetching player details.</div>`;
    }
  };
  
  const closeModal = () => {
    modalV.style.display = "none";
  };
  