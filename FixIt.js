// NavBar
// Menu Hamburger:
const menuButton = document.querySelector('.menu-hamburger');
// Mobile Nav:
const mobileNav = document.querySelector('.mobile-nav');
//Overlay:
const navOverlay = document.querySelector(`.nav-overlay`);
// Close Menu:
const mobileNavClose = document.querySelector('.mobile-nav-back');


menuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    navOverlay.classList.toggle('active');
})

navOverlay.addEventListener('click', () =>{
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('active');
})

mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('active');
})


/* ================= Progress Bar ================= */
const progressIndicator = document.querySelector('.progress-indicator');
const progressFill = document.querySelector('.progress-fill');
const progress = document.querySelector('.progress');

const currentStep = Number(progressIndicator.dataset.step);
console.log(currentStep);
const totalSteps = 5;
console.log(totalSteps)

const progressPercentage =
// Progress is made in between steps and not at the steps, hence why we calculat gaps
// gap 1: 1 → 2

// gap 2: 2 → 3

// gap 3: 3 → 4

// gap 4: 4 → 5
// Total Gaps: 4


// Gaps Moved      /   Total Gaps
((currentStep - 1) / (totalSteps - 1)) * 100;
console.log(progressPercentage)

progressFill.style.width = progressPercentage + '%';
progress.setAttribute('aria-valuenow', Math.round(progressPercentage));

/* ================= Exit Button ================= */
const exitButton = document.querySelector('.exit-cross');
const exitOverlay = document.querySelector('.exit-overlay')
const exitModal = document.querySelector('.exit-modal')
console.log(exitButton)
const keepEditingButton = document.querySelector('.exit-cancel')

exitButton.addEventListener('click', () => {
    console.log('exit clicked')
    exitOverlay.classList.add('active');
    exitModal.classList.add('active');
})

exitOverlay.addEventListener('click', () => {
    exitOverlay.classList.remove('active');
    exitModal.classList.remove('active');
})

if (keepEditingButton) {
  keepEditingButton.addEventListener('click', () => {
    exitOverlay.classList.remove('active');
    exitModal.classList.remove('active');
  });
}

/* ================= Exit to Home Button ================= */

const toHomeButton = document.querySelector('.exit-confirm');
if (toHomeButton) {
  toHomeButton.addEventListener('click', () => {
    exitOverlay.classList.remove('active');
    exitModal.classList.remove('active');
    saveDraft();
    window.location.href = 'home.html';
  });
}


/* ================= Search input ================= */


// 1) Grab the main pieces
const dropdown = document.querySelector('.category-dropdown');
const issueInput = document.querySelector('#issue');
const issueArrow = document.querySelector('.combo-arrow');
const issueMenu = document.querySelector('.combo-menu');

//Only run if everything exists
if (dropdown && issueInput && issueArrow && issueMenu) {

  // 2) Grab the options (li items inside the menu)
  const issueOptions = issueMenu.querySelectorAll('li');

  // 3) Helpers to open/close
  function openMenu() {
    issueMenu.hidden = false;
    issueInput.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    issueMenu.hidden = true;
    issueInput.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (issueMenu.hidden) openMenu();
    else closeMenu();
  }

  // 4) Click input → open menu
  issueInput.addEventListener('click', (e) => {
    e.stopPropagation(); // don't let the click reach document
    openMenu();
  });

  // 5) Click arrow → toggle menu
  issueArrow.addEventListener('click', (e) => {
    e.stopPropagation(); // don't let the click reach document
    toggleMenu();
  });

  // 6) Click option → fill input + close
  issueOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation(); // prevents "outside click" logic interfering

      issueInput.value = option.dataset.value || option.textContent.trim();

      closeMenu();
      issueInput.focus();
    });
  });

  // 7) Click outside closes the menu
  document.addEventListener('click', (e) => {
    const clickedInside = e.target.closest('.category-dropdown');
    if (!clickedInside) closeMenu();
  });

  // Filtering words while typing
  issueInput.addEventListener('input', () => {
  openMenu(); // keep menu visible while typing

  const query = issueInput.value.trim().toLowerCase(); //what the user typed, cleaned up + lowercase so matching is easier

  issueOptions.forEach((option) => {
    const label = (option.dataset.value || option.textContent).trim().toLowerCase(); // the option text, lowercase

   // Hide option ONLY if it does NOT match the typed text
    option.hidden= query.length > 0 && !label.includes(query);

  });
});

// Start closed
  closeMenu();
}




// Save draft
const issueSelect = document.querySelector('#issue');
const descriptionInput = document.querySelector('#description');
const saveDraftButton = document.querySelector('.save-draft-btn');

const DRAFT_KEY = 'fixit_draft';
function saveDraft() {
    if (!issueSelect || !descriptionInput) return;

    const draft = {
        issue: issueSelect.value,
        description: descriptionInput.value,
        savedAt: Date.now()
    };

    //                   key       , value... JSON= turns objects into storable strings
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    showDraftSaved();
}

if (saveDraftButton) {
    saveDraftButton.addEventListener('click', () => {
        saveDraft();
    })
}

// How to view saved draft when page is reloaded
// localStorage.getItem(...) → “read something from the notebook”
// DRAFT_KEY → “using the label fixit_draft”
// savedDraft → “store whatever comes back”

function restoreDraft() {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    console.log(savedDraft);
    
    if (!savedDraft) return;

    // Convert saved text back into a real object
const draft = JSON.parse(savedDraft);
console.log(draft)

issueSelect.value = draft.issue || '';
descriptionInput.value = draft.description || '';
}
restoreDraft();

// Draft saved feedback
const savedFeedback = document.querySelector('.saved-feedback');

function showDraftSaved() {
if (!savedFeedback) return;

savedFeedback.classList.add('show');

setTimeout(() => {
    savedFeedback.classList.remove('show');
}, 2000);

}

// Character Count
const charCountText = document.querySelector('.char-count');
console.log(charCountText)

const MAX_CHARS = 250;

function updateCharacterCount() {
// Clamp- Cuts off any extra characters:
    if (descriptionInput.value.length > MAX_CHARS){
        descriptionInput.value = descriptionInput.value.slice(0, MAX_CHARS);
    }

    const currentLength = descriptionInput.value.length;
    const remaining = MAX_CHARS - currentLength;

    charCountText.textContent = `${remaining} characters remaining` ;

    // Reset states first
charCountText.classList.remove('is-warning', 'is-danger');

// Warning State
    if (remaining <= 10){
        charCountText.classList.add('is-danger');
    } 
    else if (remaining <= 20) {
        charCountText.classList.add('is-warning');
    }
}
updateCharacterCount();

if (descriptionInput) {
    descriptionInput.addEventListener('input',() => {
        updateCharacterCount();
    });
}


// Tip
const tip = document.querySelector('.tip');
const tipButton = document.querySelector('.tip-button');

if (tip && tipButton){
    tipButton.addEventListener('click', () => {
        const isOpen = tipButton.getAttribute('aria-expanded') === 'true';

        tipButton.setAttribute('aria-expanded', String(!isOpen));
        tip.classList.toggle('open');
    });
}

/* ================= Page 6 ================= */
const uploadInput = document.getElementById("photo-upload");
const imageContainer = document.getElementById("image-container");
const uploadCard = document.getElementById("upload-card");

uploadInput.addEventListener("change", () => {
  console.log()
})


