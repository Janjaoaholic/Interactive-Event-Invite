// script.js — handles the RSVP form submission

// This function runs when the user clicks "Send My RSVP"
function rsvpSubmit(event) {

  // Stops the page from refreshing (default form behaviour)
  event.preventDefault();

  // ── Read the form values ──

  // Grab what the user typed in the email field
  const email = document.getElementById("email").value;

  // Grab what the user selected in the attendance dropdown
  const attendance = document.getElementById("attendance").value;

  // ── Find the confirmation message box ──

  // Select the empty div where we'll display the message
  const messageBox = document.getElementById("confirmation-message");

  // ── Check attendance and set the right message ──

  if (attendance === "yes") {

    // Set PARTY GIF as full page background
    document.body.style.backgroundImage = "url('https://media.giphy.com/media/l2JHPB58MjfV8W3K0/giphy.gif')";
    document.body.style.backgroundSize = "cover";       /* stretches to fill the whole page */
    document.body.style.backgroundPosition = "center";  /* centers the image */
    document.body.style.backgroundRepeat = "no-repeat"; /* no tiling */
    document.body.style.backgroundAttachment = "fixed"; /* stays put when scrolling */

    // Make RSVP box 50% transparent
    document.querySelector(".rsvp-section").style.opacity = "0.5";

    // User is attending — show a celebratory message
    messageBox.innerHTML = `
      🎉🪄✨
      <br><br>
      Woohoo, <strong>${email}</strong>!
      <br><br>
      Your RSVP is confirmed — we'll see you at the GIF Gala!
      Get ready for a magical night of memes, music, and mayhem.
      <br><br>
      🎭🌟🎊
    `;

  } else {

    // Set SAD GIF as full page background
    document.body.style.backgroundImage = "url('https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif')";
    document.body.style.backgroundSize = "cover";       /* stretches to fill the whole page */
    document.body.style.backgroundPosition = "center";  /* centers the image */
    document.body.style.backgroundRepeat = "no-repeat"; /* no tiling */
    document.body.style.backgroundAttachment = "fixed"; /* stays put when scrolling */

    // Make RSVP box 50% transparent
    document.querySelector(".rsvp-section").style.opacity = "0.5";

    // User is NOT attending — show a warm, sad message
    messageBox.innerHTML = `
      😔
      <br><br>
      We will miss you at the GIF Gala!
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
