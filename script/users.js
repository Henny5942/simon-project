const tbody = document.querySelector("#playersTable tbody"); //מאתר את גוף הטבלה שם נכניס את השורות שניצור

const playersData = JSON.parse(localStorage.getItem("playersData")) || {}; // שליפת הנתונים מה-localStorage

// מוודא שיש שחקנים
if (Object.keys(playersData).length === 0) { //אם אין שם נתונים
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.colSpan = 2; //ברוחב של שתי העמודות
  td.textContent = "אין נתונים להצגה";
  tr.appendChild(td);
  tbody.appendChild(tr);
} else {
  let playersArray = Object.entries(playersData);// ממירים את האובייקט למערך של זוגות
  //פונקציית חץ
  playersArray.sort((a, b) => b[1].stage - a[1].stage); // ממיינים לפי stage מהגבוה לנמוך
  
  // עובר בלולאה על כל שחקן לפי ת"ז שלו- מפתח אובייקט
  for (const [id, player] of playersArray) {
    
    const tr = document.createElement("tr"); //יוצר שורת טבלה חדשה

    const tdName = document.createElement("td"); //יוצר תא ראשון עם שם המשתמש
    tdName.textContent = player.username;

    const tdStage = document.createElement("td"); //יוצר תא שני עם מספר השלב של השחקן
    tdStage.textContent = player.stage; 
    //מכניס את שני התאים לשורה
    tr.appendChild(tdName);
    tr.appendChild(tdStage);

    tbody.appendChild(tr); //מוסיף את השורה לגוף הטבלה
  }
}
