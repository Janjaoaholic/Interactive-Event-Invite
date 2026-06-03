// script.js — handles the RSVP form submission + saves to Firebase

// ════════════════════════════════════════════════
// FIREBASE SETUP
// Connects to your Realtime Database in Singapore.
//
// ⚠️  IMPORTANT: Replace the placeholder values
//     below with your real config from Firebase
//     console → Project settings → Your apps → </>
// ════════════════════════════════════════════════
const firebaseConfig = {
  apiKey:            "AIzaSyCMP6FrsG25MrqPA61PB-cEYBSXmG3wBFg",
  authDomain:        "first-database-85b1d.firebaseapp.com",
  databaseURL:       "https://first-database-85b1d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "first-database-85b1d",
  storageBucket:     "first-database-85b1d.firebasestorage.app",
  messagingSenderId: "879230977122",
  appId:             "1:879230977122:web:b7c1f276f5b71cb277bd3b",
  measurementId:     "G-47W6LEREZ9"
};

// Initialize Firebase — connects this page to your cloud database
firebase.initializeApp(firebaseConfig);

// Get a reference to the Realtime Database service
const db = firebase.database();

// Point to the "rsvps" node in your database.
// Each RSVP will be stored here:
//   rsvps/
//     └── -NxAbc123: { email: "...", attendance: "yes", time: 123... }
//     └── -NxDef456: { email: "...", attendance: "no",  time: 123... }
const rsvpsRef = db.ref('rsvps');


// ════════════════════════════════════════════════
// RSVP SUBMIT — runs when the user clicks the button
// ════════════════════════════════════════════════
function rsvpSubmit(event) {

  // Stops the page from refreshing (default form behaviour)
  event.preventDefault();

  // ── Read the form values ──

  // Grab what the user typed in the email field
  const email = document.getElementById("email").value;

  // Grab what the user selected in the attendance dropdown
  const attendance = document.getElementById("attendance").value;

  // ── Save the RSVP to Firebase ─────────────────────────────────
  // rsvpsRef.push() creates a new child node with a unique
  // auto-generated key so RSVPs never overwrite each other.
  // We save: email, attendance answer, and a timestamp.
  rsvpsRef.push({
    email:      email,
    attendance: attendance,
    time:       Date.now()   // timestamp — useful for sorting later
  })
  .then(() => {
    // ── Firebase save succeeded ──
    // Now update the UI with the confirmation message
    showConfirmation(email, attendance);
  })
  .catch((error) => {
    // ── Firebase save failed ──
    // Show an error message so the user knows something went wrong
    const messageBox = document.getElementById("confirmation-message");
    messageBox.innerHTML = `
      ⚠️
      <br><br>
      Oops! Something went wrong saving your RSVP.
      <br>
      Error: ${error.message}
      <br><br>
      Please check your Firebase rules allow writes, then try again.
    `;
    messageBox.style.display = "block";
    messageBox.scrollIntoView({ behavior: "smooth" });
  });

}


// ════════════════════════════════════════════════
// SHOW CONFIRMATION — updates the UI after saving
// Separated from rsvpSubmit so it only runs after
// Firebase confirms the data was saved successfully.
// ════════════════════════════════════════════════
function showConfirmation(email, attendance) {

  // ── Find the confirmation message box ──
  const messageBox = document.getElementById("confirmation-message");

  if (attendance === "yes") {

    // Set PARTY GIF as full page background
    document.body.style.backgroundImage = "url('https://media.giphy.com/media/l2JHPB58MjfV8W3K0/giphy.gif')";
    document.body.style.backgroundSize       = "cover";       /* stretches to fill the whole page */
    document.body.style.backgroundPosition   = "center";      /* centers the image */
    document.body.style.backgroundRepeat     = "no-repeat";   /* no tiling */
    document.body.style.backgroundAttachment = "fixed";       /* stays put when scrolling */

    // Make RSVP box 50% transparent
    document.querySelector(".rsvp-section").style.opacity = "0.5";

    // User is attending — show a celebratory message
    messageBox.innerHTML = `
      🎉🪄✨
      <br><br>
      Woohoo, <strong>${email}</strong>!
      <br><br>
      Your RSVP is confirmed and saved — we'll see you at the GIF Gala!
      Get ready for a magical night of memes, music, and mayhem.
      <br><br>
      🎭🌟🎊
    `;

  } else {

    // Set SAD GIF as full page background
    document.body.style.backgroundImage = "url('https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif')";
    document.body.style.backgroundSize       = "cover";       /* stretches to fill the whole page */
    document.body.style.backgroundPosition   = "center";      /* centers the image */
    document.body.style.backgroundRepeat     = "no-repeat";   /* no tiling */
    document.body.style.backgroundAttachment = "fixed";       /* stays put when scrolling */

    // Make RSVP box 50% transparent
    document.querySelector(".rsvp-section").style.opacity = "0.5";

    // User is NOT attending — show a warm, sad message
    messageBox.innerHTML = `
      😔
      <br><br>
      We will miss you at the GIF Gala!
      <br><br>
      Your RSVP has been saved. Maybe next time! 💫
    `;

  }

  // ── Show the confirmation message box ──
  // Changes display from "none" to "block" — makes the box visible
  messageBox.style.display = "block";

  // ── Smoothly scroll up to the confirmation message ──
  // Scrolls the page so the user sees the message automatically
  messageBox.scrollIntoView({ behavior: "smooth" });

  // ── Reset the form fields back to empty ──
  // Clears the form so it looks fresh after submitting
  document.querySelector("form").reset();

}
