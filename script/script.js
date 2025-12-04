const colors = ["red", "blue", "green", "yellow"];
let orderPlay = [];  // הרצף שהמחשב מציג
let orderUser = [];  // הרצף שהשחקן לוחץ
let acceptingInput = false;  // האם מותר לשחקן ללחוץ על כפתורים
let currentRound = 0;  // סופר את מספר הסיבובים בתוך שלב
let maxRounds = 4;   //מספר הסיבובים הנדרש בשלב זה

let startB = document.getElementById("start");
let stage = document.querySelector("#stage");

const username = localStorage.getItem("username");  // שם המשתמש
const idNumber = localStorage.getItem("idNumber");  //מספר זהות
const playersData = JSON.parse(localStorage.getItem("playersData")) || {}; //השחקנים שנשמרו

let stages = 1; // מספר שלב

//הצהגת השלב והשם על המסך
stage.innerHTML = "שלב: " + stages;
document.getElementById("welcome").textContent = "שלום " + username + "!";

// פונקציית השהיה
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// הצגת רצף צבעים
async function showColors(order) {
  acceptingInput = false;
  for (let color of order) {
    const el = document.getElementById(color);
    el.classList.add("active");
    await sleep(250);  //הצבע דולק
    el.classList.remove("active");
    await sleep(100);  //השהייה בין צבע לצבע
  }
  acceptingInput = true;
}

// האזנה לצבעים
let btns = document.querySelectorAll(".btn"); 
btns.forEach(color => color.addEventListener("click", btnclick));

// בדיקת רצף
async function btnclick() {
  if (!acceptingInput) return; //אם אסור למשתמש ללחוץ הוא מחזיר את הפונקציה

  orderUser.push(this.id); //מוסיף את הצבע למערך

  if (orderPlay[orderUser.length - 1] !== this.id) { //כשיש לו טעות הוא מועבר לטבלת השחקנים 
    window.location.href = "../html/users.html";
  } else if (orderUser.length === orderPlay.length) { //סיים רצף נכון
    acceptingInput = false;
    if (currentRound === maxRounds) { //הגיע לסוף השלב
      let playersData = JSON.parse(localStorage.getItem("playersData")) || {};
      const idNumber = localStorage.getItem("idNumber"); // נוסיף את זה אם לא הוגדר קודם

      if (!playersData[idNumber]) {  // אם משום מה המשתמש לא קיים
        playersData[idNumber] = {
          username: username,
          stage: stages,
        };
      } else {
        if (stages > playersData[idNumber].stage) { //בודק אם השלב הנוכחי גדול מהשלב המופיע בטבלה
          playersData[idNumber].stage = stages;
        }
      }

      localStorage.setItem("playersData", JSON.stringify(playersData)); //שומר את השלב הכי גבוה שהשחקן הגיע אליו
      
      alert("כל הכבוד! סיימת את שלב "+stages+" בהצלחה"); 
      showConfetti();//הפעלת הקופטי
      await sleep(3000);
      maxRounds += 2; //מגדיל את הרצף
      stages++; //מגדיל את השלב
      resetGame(); //מאפס
      playSimon(); //מתחיל שלב חדש
    } else { //אם הוא עדיין באמצע השלב
      setTimeout(() => playSimon(), 800); //מזמין עוד סבב
    }
  }
}

// הפעלת סבב חדש
async function playSimon() {
  currentRound++; 
  startB.textContent = "התחל מחדש 🔁";
  const newColor = colors[Math.floor(Math.random() * colors.length)]; //מגריל צבע חדש
  orderPlay.push(newColor); //מוסיף אותו למערך
  await showColors(orderPlay); //מציג את כל המערך למשתמש
  orderUser = []; //מנקה את הלחיצות של המשתמש
}

// איפוס המשתנים
function resetGame() {
  orderPlay = [];
  orderUser = [];
  currentRound = 0;
  stage.innerHTML = "שלב: " + stages; // משנה את השלב על המסך
}

// התחלת משחק מחדש
startB.onclick = () => {
  maxRounds = 4;
  stages = 1;
  resetGame(); //איפוס
  playSimon(); //התחלה
};

//האזנה ללחיצות
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    startB.click(); //התחלת המשחק בלחיצות Enter
  }
});
//קונפטי במעבר שלב
function showConfetti() {
  confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 0.6 }
  });
}
