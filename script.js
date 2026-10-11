// PERSONALIZE THIS FILE: edit names, messages, flower notes, captions, and photo filenames.
const CONFIG = {
  birthdayName: "my love",
  letter: "Happy birthday, sweetheart. I hope this new year of your life brings you the kind of happiness you give to everyone around you. Thank you for being you. You deserve every soft, beautiful thing in this world.",
  flowerNotes: [
    "Your smile can make an ordinary day feel special.",
    "I love the way you care about the people you love.",
    "You make even the smallest moments feel memorable.",
    "You deserve the gentlest kind of happiness.",
    "Your laugh is one of my favourite sounds.",
    "I hope you always feel proud of how far you've come.",
    "You make the world feel a little warmer.",
    "You are loved more than you sometimes realise.",
    "I love hearing about the things you're passionate about.",
    "You make being yourself look beautiful.",
    "I hope life gives back all the kindness you give.",
    "You deserve dreams that come true and new ones to chase.",
    "Thank you for all the little things you do.",
    "If today gets hard, remember someone is cheering for you."
  ],
  letters: [
    { title: "Open when you miss me", body: "If I could, I'd be right beside you right now. Until then, imagine the biggest hug, a forehead kiss, and me reminding you that you're never far from my thoughts. ♡" },
    { title: "Open when you need a smile", body: "Tiny reminder: you're wonderful, you're doing better than you think, and you don't have to have everything figured out today. Drink some water, take a breath, and remember that I'm rooting for you. 🌷" }
  ],
  photoCaptions: ["a favourite memory ♡", "you + me", "one for the scrapbook", "my happy place", "this moment, always", "just us being us", "a little bit of magic", "the camera roll classic", "more memories, please", "my favourite smile", "wish we could replay this", "kept close to my heart"],
  // Add photos/photo1.jpg, photos/photo2.jpg, etc. Update filenames here if needed.
  photoFiles: ["photos/photo1.jpg", "photos/photo2.jpg", "photos/photo3.jpg", "photos/photo4.jpg", "photos/photo5.jpg", "photos/photo6.jpg", "photos/photo7.jpg", "photos/photo8.jpg", "photos/photo9.jpg", "photos/photo10.jpg", "photos/photo11.jpg", "photos/photo12.jpg"]
};

document.title = `Happy Birthday, ${CONFIG.birthdayName} ♡`;
document.getElementById("heroName").textContent = CONFIG.birthdayName;
document.getElementById("letterText").textContent = CONFIG.letter;

const flowerSymbols = ["🌷","🌸","🌼","🌹","🌻","🪷","🌺"];
const flowerGrid = document.getElementById("flowerGrid");
CONFIG.flowerNotes.forEach((note, i) => {
  const button = document.createElement("button");
  button.className = "flower-card";
  button.innerHTML = `<span class="flower">${flowerSymbols[i % flowerSymbols.length]}</span><span>little note ${String(i+1).padStart(2,"0")} ♡</span>`;
  button.addEventListener("click", () => showNote(`A flower for you ${flowerSymbols[i % flowerSymbols.length]}`, note));
  flowerGrid.appendChild(button);
});

const photoGrid = document.getElementById("photoGrid");
CONFIG.photoFiles.forEach((file, i) => {
  const card = document.createElement("div");
  card.className = "photo-card";
  card.style.setProperty("--tilt", `${[-2,1.5,-1,2,-1.5,1][i % 6]}deg`);
  const img = document.createElement("img");
  img.src = file;
  img.alt = CONFIG.photoCaptions[i % CONFIG.photoCaptions.length];
  img.loading = "lazy";
  img.onerror = () => {
    img.remove();
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.textContent = "your photo goes here ♡";
    card.prepend(placeholder);
  };
  const caption = document.createElement("p");
  caption.textContent = CONFIG.photoCaptions[i % CONFIG.photoCaptions.length];
  card.append(img, caption);
  photoGrid.appendChild(card);
});

const dialog = document.getElementById("noteDialog");
function showNote(title, body) {
  document.getElementById("dialogTitle").textContent = title;
  document.getElementById("dialogBody").textContent = body;
  dialog.showModal();
}
document.querySelectorAll(".note-card").forEach(button => {
  button.addEventListener("click", () => {
    const note = CONFIG.letters[Number(button.dataset.note)];
    showNote(note.title, note.body);
  });
});
document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

document.getElementById("openLetter").addEventListener("click", e => {
  e.currentTarget.classList.toggle("open");
  document.getElementById("letter").classList.toggle("hidden");
});
document.getElementById("wishButton").addEventListener("click", () => {
  document.getElementById("finalMessage").classList.toggle("hidden");
});
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
musicButton.addEventListener("click", async () => {
  if (!song.getAttribute("src") || song.error) {
    alert("Add your audio file as music/Haareya.mp3, then refresh the page.");
    return;
  }
  if (song.paused) {
    try { await song.play(); musicButton.textContent = "Ⅱ Pause our song"; }
    catch { alert("Please add music/Haareya.mp3 and tap again. Browsers require a tap before music can play."); }
  } else {
    song.pause(); musicButton.textContent = "♫ Play our song";
  }
});
song.addEventListener("ended", () => musicButton.textContent = "♫ Play our song");
