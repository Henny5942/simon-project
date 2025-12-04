document.getElementById("loginForm").addEventListener("submit", function (e) {
  //בעת שליחת הטופס
  e.preventDefault(); //מונע את פעולת ברירת המחדל של שליחת טופס

  const username = document.getElementById("username").value.trim();
  const idNumber = document.getElementById("idNumber").value.trim();

  const input = document.getElementById("username");

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.classList.add("input-error");
    } else {
      input.classList.remove("input-error");
    }
  });


  //בודק שהשדות מלאים
  if (username === "" || idNumber === "") {
    alert("אנא מלא את כל השדות");
    return;
  }
  //שימוש בפונקציות על מערכים ובביטוי רגולארי
  if (username.includes(" ")) {
    username = username.replace(/ /g, "");
    alert("שם משתמש לא יכול לכלול רווחים, הרווחים הוסרו");
  }


  //  שומר את השם והמספר זהות
  localStorage.setItem("username", username);
  localStorage.setItem("idNumber", idNumber);

  //בודק אם יש משהו באחסון המקומי והפך אותו לאובייקט רגיל ולא לJSON
  let playersData = JSON.parse(localStorage.getItem("playersData")) || {};

  // המרה של האובייקט למערך של שחקנים עם ת"ז
  let playersArray = Object.entries(playersData).map(([id, player]) => ({ id, ...player }));

  // חיפוש שחקן עם מספר זהות מסוים
  let existingPlayer = playersArray.find(player => player.id === idNumber);

  //אם המשתמש לא קיים- יוצר רשומה חדשה
  if (!existingPlayer) {
    playersData[idNumber] = {
      username: username,
      stage: 0,
    };
  } else { //אם הוא נמצא - נעדכן את השם שהוכנס הפעם
    playersData[idNumber].username = username;
  }
  //שומר את כל הנתונים המעודכנים חזרה אל localStorage
  localStorage.setItem("playersData", JSON.stringify(playersData));

  // מעבר לדף המשחק
  window.location.href = "html/game.html";
});
