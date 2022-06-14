let settings = {
    "auto": [
      {
        "label": "High Goal",
        "trigger": "f", 
        "columnStart": 1,
        "columnEnd": 3,
        "rowStart": 1,
        "rowEnd": 3,
        "writeLoc": 1,
        "writeType": "int"
      },
      {
        "label": "Low Goal",
        "trigger": "d", 
        "columnStart": 3,
        "columnEnd": 5,
        "rowStart": 1,
        "rowEnd": 3,
        "writeLoc": 2,
        "writeType": "int"
      }, 
      {
        "label": "Missed Goal",
        "trigger": "j", 
        "columnStart": 1,
        "columnEnd": 3,
        "rowStart": 3,
        "rowEnd": 5,
        "writeLoc": 3,
        "writeType": "int"
      }, 
      {
        "label": "Taxi",
        "trigger": "k", 
        "columnStart": 3,
        "columnEnd": 5,
        "rowStart": 3,
        "rowEnd": 5,
        "writeLoc": 0,
        "writeType": "bool"
      }
    ]
    
  }

  let dataValues = [false, 0, 0, 0, 0, 0, 0, false, 0, 0, 0, false, "", false, "", ""];
  let dataLabels = ["Taxi", "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Level", "Climb Time", "Defence Time", "Penalty", "Yeet", "Oof", "QATA", "Drivetrain Type"];